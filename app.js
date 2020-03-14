const fs = require('fs')
const express = require('express')


const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (ref, res) => {
  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: {
      tours
    }
  })
})
// console.log(tours)
// app.post('/', (ref, res) => {
//   res.status(200).send(`you can post to this methot`)
// })



const port = 3000;
app.listen(port, () => {
  console.log(`App running5 on port ${port}`)
})