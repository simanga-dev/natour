const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

// const DB = process.env.DATABASE_LOCAL;
const DB = "mongodb://localhost:27017/natours"


mongoose
  .connect(DB, {
    userNewUrParser: true,
    useCreteIndex: true,
    useFindAndModify: false,
  })

  .then(() => console.log('DB connection successful!'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('import all');
  } catch (e) {
    console.log(e);
      console.log(e);
    /* handle error */
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted all');
  } catch (e) {
    /* handle error */
    console.log(e);
  }
};
// if (process.argv[2] === '--import') {
  importData();
// } else if (process.argv[2] === '--delete') {
  // deleteData();
// }
