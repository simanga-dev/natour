const AppErro = require('../utils/app_erro');

const handleCastError = (err) => {
  const message = `Inavlide ${err.path}: ${err.value}.`;

  return new AppErro(message, 400);
};

const handleDuplicateField = (err) => {
  const value = err.errmsg(/(["'])/);
  const message = `Duplicate field  value ${value}: please use another value`;

  return new AppErro(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid Input data ${errors.join('. ')}`;
  return new AppErro(message, 400);
};

const handleJWTError = (err) =>
  new AppErro('invalid Token, Please login again', 401);

const sendErroDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    erro: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErroProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.erro('ERROR', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'erro';

  if (process.env.NODE_ENV === 'development') {
    sendErroDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 1100) error = handleDuplicateField(error);
    if (error.name === 'ValidationErro') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

    sendErroProd(error, res);
  }
};
