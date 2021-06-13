const express = require('express');
const morgan = require('morgan');
const AppErro = require('./utils/app_erro');
const bp = require('body-parser');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const globalErro = require('./controllers/error_controller');

const app = express();

// 1) MIDDLEWARE
//This is how we use middle ware
// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

// app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppErro(`cant find ${req.originalUrl}`, 404));
});

app.use(globalErro);

module.exports = app;
