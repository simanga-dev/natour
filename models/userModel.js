const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypy = require('bcryptjs');
const validator = require('validator');

const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },

  surname: {
    type: String,
    required: [true, 'A user must have a surname'],
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },

  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'quide'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, 'Please Provide a password'],
    minlength: 8,
    select: false,
  },

  confirm_password: {
    type: String,
    required: [true, 'Please confirm your a password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password do not match',
    },
  },
  change_password_after: Date,
  pass_reset_token: String,
  reset_token_expire: String,
});

user_schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypy.hash(this.password, 12);
  this.confirm_password = undefined;

  next();
});

user_schema.methods.correct_password = async function (
  candidate_pass,
  user_pass
) {
  return await bcrypy.compare(candidate_pass, user_pass);
};

user_schema.methods.isPasswordChanged = function (JWTTimestamp) {
  if (this.change_password_after) {
    const timestamp = parseInt(this.change_password_after.getTime() / 1000);

    return JWTTimestamp < timestamp;
  }

  return false;
};

user_schema.methods.generate_reset_token = function () {
  const reset_token = crypto.randomBytes(32).toString('hex');

  this.pass_reset_token = crypto
    .createHash('sha256')
    .update(reset_token)
    .digest('hex');

  this.rest_token_expire = Date.now() + 10 * 60 * 1000;

  return reset_token;
};

const User = mongoose.model('User', user_schema);

module.exports = User;
