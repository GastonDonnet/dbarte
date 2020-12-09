const { ValidationError } = require('objection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const BaseModel = require('./baseModel');
const CustomDate = require('../utils/date');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password', 'email', 'firstName', 'lastName'],

      properties: {
        id: { type: 'integer' },

        username: { type: 'string', minLength: 5, maxLength: 50 },
        password: { type: 'string', minLength: 8, maxLength: 50 },
        email: { type: 'string', minLength: 8, maxLength: 50, format: 'email' },

        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        birthDate: { type: 'date' },
        genre: {
          type: 'string',
          enum: ['Male', 'Female', 'Other'],
          default: 'Other',
        },

        passwordChangedAt: { type: 'datetime, null' },
        passwordResetToken: { type: 'string, null' },
        passwordResetExpires: { type: 'datetime, null' },
        isActive: { type: 'bool' },
      },
    };
  }

  // Virtuals

  // Hooks

  async $afterFind(context) {
    if (!context.getAllFields) {
      this.password = undefined;
      this.passwordResetToken = undefined;
    }
  }

  async $beforeInsert() {
    if (this.id) {
      throw new ValidationError({
        message: 'identifier should not be defined before insert',
        type: 'MyCustomError',
        data: {},
      });
    }

    await this.$cryptPassword();
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    //this.updatedAt = new CustomDate().ISO();
    console.log(new CustomDate(), new CustomDate().date);

    if (this.password) {
      this.passwordChangedAt = new CustomDate().addSeconds(-5).ISO();
      this.passwordConfirm = undefined;
      await this.$cryptPassword();
    }
  }

  //Methods

  async $cryptPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async $comparePassword(candidatePassword, userPassword) {
    if (this.password) {
      return await bcrypt.compare(candidatePassword, this.password);
    }

    console.log('COMPARANDO CON ARGUMENTO');
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  static changesPasswordAfter(JWTTimestamp, passwordChangedAt) {
    if (passwordChangedAt !== null) {
      const changedTimestamp = new CustomDate(passwordChangedAt * 1)
        .addHours(3)
        .getTime();
      return JWTTimestamp * 1000 < changedTimestamp;
    }

    // False mean not changed
    return false;
  }

  async $createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.passwordResetExpires = new CustomDate().addMinutes(10).ISO(); // Expira en 10 minutos

    return resetToken;
  }
}

module.exports = User;
