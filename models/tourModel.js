const mongoose = require('mongoose');

const tour_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must ave a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tour_schema);

module.exports = Tour;
