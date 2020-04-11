const fs = require('fs')


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkID = (req, res, next, val) => {
  console.log(`just to see if ${val}`)
  if (parseInt(val) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'inavlid id'
    })
  }

  next()
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: {
      tours
    }
  })
}
exports.getTour = (req, res) => {
  console.log(req.requestTime)

  // if (parseInt(req.params.id) > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'inavlid id'
  //   })
  // }

  const tour = tours.find(el => el.id === parseInt(req.params.id))
  // console.log(tour)
  res.status(200).json({
    status: 'sucess',
    // results: tours.length,
    data: {
      tour
    }
  })
}

exports.createTour = (req, res) => {

  const newId = tours[tours.length - 1].id + 1

  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }

    })
  })

}

exports.updateTour = (req, res) => {

  // if (parseInt(req.params.id) > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'inavlid id'
  //   })
  // }
  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Updated tour here....'
    }
  })
}

exports.deleteTour = (req, res) => {

  res.status(204).json({
    status: 'success',
    data: null
  })
}


