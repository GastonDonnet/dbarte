const AppError = require('../utils/appError');

// Custom Errors Handler
const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (error) => {
  let message = '';
  if (error.constraint === 'users_email_unique')
    message = 'El email ya ha sido utilizado!. Por favor utiliza otro email';

  if (!message) {
    message = `Duplicate field ${error.constraint}. Please use another value`;
  }

  return new AppError(message, 400);
};

const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = `Invalid token. Please log in again.`;
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = `Your token has expired! Please log in again.`;
  return new AppError(message, 401);
};

// Dev / Prod
const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};
const sendErrorProd = (error, res) => {
  // Operational, trusted error: send message to client
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    //1) Log Error
    console.log('ERROR: ', error);

    //2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// Main error handler
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let errorCopy = { ...error }; //TODO: BUG ACA
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.name === 'UniqueViolationError') {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError(error);
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError(error);
    }

    sendErrorProd(error, res);
  }
};
