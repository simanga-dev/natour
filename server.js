const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', (err) => {
  console.log(err);
    process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
//
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    userNewUrParser: true,
    useCreteIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

