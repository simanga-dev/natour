import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import './app';


process.on('uncaughtException', (err) => {
  console.log(err);
    process.exit(1);
});


dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
//
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(`${DB}`, {
    // userNewUrParser: true,
    // useCreteIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

