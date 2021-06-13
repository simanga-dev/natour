const { promisify } = require('util');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catch_async');
const AppError = require('../utils/app_erro');
const sendMail = require('../utils/mail');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    surname: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide a email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correct_password(password, user.password))) {
    return next(
      new AppError('User name or The password is incorect', 401),
      401
    );
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'Success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in, Please log in', 401));
  }

  // verify the provide token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user still exist in th database
  const login_user = await User.findById(decoded.id);

  if (!login_user) {
    return next(AppError('The user nologer exits', 401));
  }

  // check if the password was checked after the token was issued
  if (login_user.isPasswordChanged(decoded.iat)) {
    return next(
      new AppError('Have problem loggiing you in. please login in again', 401)
    );
  }

  req.user = login_user;

  next();
});

exports.rescrit_to = (...roles) => {
  return (req, res, next) => {
    if (!roles.include(req.user.role)) {
      return next(
        new AppError('You do not have permesion to perfon this action', 403)
      );
    }
  };
};

exports.reset_password = catchAsync(async (req, res, next) => {});

exports.forgot_password = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('The is no user with that email address', 404));
  }

  const reset_token = user.generate_reset_token();
  user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${reset_token}`;

  const message = `I am tired right now. I need money... I hope everthing work out ${resetURL}`;

  try {
    await sendMail({
      email: user.email,
      subject: 'Hope I get a job soon',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'token sent',
    });
  } catch (e) {
    /* handle error */
    user.pass_reset_token = undefined;
    user.reset_token_expire = undefined;
    user.save({ validateBeforeSave: false });

    return next(new AppError('The was an erro sending an email', 500));
  }
});
