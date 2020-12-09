const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const CustomDate = require('../utils/date');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new CustomDate().addDays(process.env.JWT_COOKIE_EXPIRES_IN).date,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //Remove the password from the output
  user.password = undefined;
  user.passwordResetToken = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // 0) Password Validation
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Los passwords ingresados no coinciden!', 400));
  }

  const newUser = await User.query().insert({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    genre: req.body.genre,
  });

  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // 1) Check if email and password exist
  if ((!email && !username) || !password) {
    return next(
      new AppError('Please provide username o email and password', 400)
    );
  }

  // 2) Check if user exist && password is correct
  let user = {};
  if (email) {
    user = await User.query().findOne({ email: email });
  } else if (username) {
    user = await User.query()
      .context({ getAllFields: true })
      .findOne({ username: username });
  }

  if (!user || !(await user.$comparePassword(password))) {
    return next(new AppError('Incorrect user o password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on posted email
  let user = {};
  if (req.body.email) {
    user = await User.query().findOne({ email: req.body.email });
  } else if (req.body.username) {
    user = await User.query().findOne({ username: req.body.username });
  }

  if (!user) {
    return next(
      new AppError('There is no user with that email or username.', 400)
    );
  }

  // 2) Generate the random reset token
  const resetToken = await user.$createPasswordResetToken();
  await user.$query().patch({
    passwordResetToken: user.passwordResetToken,
    passwordResetExpires: user.passwordResetExpires,
  });

  console.log('token:', resetToken);

  try {
    // 3) Send it to user email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendResetPassword();

    res.status(200).json({
      status: 'success',
      message: `Your reset token has succefully send to your email! (${user.email})`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.$query().patch({
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 0) Password Validation
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Los passwords ingresados no coinciden!', 400));
  }

  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.query()
    .findOne({
      passwordResetToken: hashedToken,
    })
    .andWhere('passwordResetExpires', '>', new CustomDate().ISO());

  if (!user) {
    return next(new AppError('Invalid Token or has expired.', 400));
  }

  // 2) If token has not expired, and there is user, set the new password
  await user.$query().patch({
    password: req.body.password,
    passwordResetToken: null,
    passwordResetExpires: null,
  });

  // 3) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  // 0) Compare Passwords
  if (password !== passwordConfirm) {
    return next(new AppError('Los passwords ingresados no coinciden!', 400));
  }

  // 1) Get user from collection
  const user = await User.query()
    .findById(req.user.id)
    .context({ getAllFields: true });

  // 2) Check if posted current password is correct
  if (!(await user.$comparePassword(passwordCurrent))) {
    return next(new AppError('Invalid current password.', 400));
  }

  // 3) If so, update password
  await user.$query().patch({ password: password });

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

/////////////////////////////////////////////////////////
// Middlewares
/////////////////////////////////////////////////////////
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token
  let token;
  if (
    req.headers.authorization && // Lee JWT desde Header
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt; // Lee JWT desde Cookie
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exist
  const freshUser = await User.query().findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError(
        'The user belonging to this token does not longer exist!',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (User.changesPasswordAfter(decoded.iat, freshUser.passwordChangedAt)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 403)
    );
  }

  // 5) Grant access to protected Route
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have premission to perform this action.', 403)
      );
    }

    next();
  });
};
