const express = require('express');
const morgan = require('morgan');
const AppErro = require('./utils/app_erro');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();

// 1) MIDDLEWARE
//This is how we use middle ware
// if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
// }

// app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.all('*', (req, res, next) => {
//   // res.status(404).json({
//   //     status: 'fail',
//   //     message: `cant find ${req.originalUrl}`
//   // })
//   const err = new Error(`cant find ${req.originalUrl}`);
//   err.status = 'fail';
//   err.statusCode = 404;

//   next(err);

//   // next(new AppErro(`cant find ${req.originalUrl}`, 404));
// });

// app.use((err, req, res, next) => {
//   console.log(err.stack);

//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'erro';

//   res.status(err.statusCode).json({
//     status: err.statusCode,
//     message: err.message,
//   });
// });

module.exports = app;
