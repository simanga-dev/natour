const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app')

dotenv.config({ path: './config.env' })

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  userNewUrParser: true,
  useCreteIndex: true,
  useFindAndModify: false
}).then(con => {
    console.log(!con.connection);
    console.log('DB connection successful!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
