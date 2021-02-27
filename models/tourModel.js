const mongoose = require('mongoose');

// const sample = [{
//     id: 8,
//     name: 'The Northern Lights',
//     duration: 3,
//     max_group_size: 12,
//     difficulty: 'easy',
//     rating_average: 4.9,
//     rating_quantity: 33,
//     price: 1497,
//     summary: 'Enjoy the Northern Lights in one of the best places in the world',
//     description:
//       'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!\nDolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet, consectetur adipisicing elit!',
//     image_cover: 'tour-9-cover.jpg',
//     images: ['tour-9-1.jpg', 'tour-9-2.jpg', 'tour-9-3.jpg'],
//     start_dates: ['2021-12-16,10:00', '2022-01-16,10:00', '2022-12-12,10:00'],
//   },
// ];

const tour_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must ave a name'],
    // unique: true,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  rating_average: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  max_group_size: Number,

  difficulty: {
    type: String,
    required: true,
  },

  rating_quantity: {
    required: true,
    type: Number,
  },

  summary: {
    trim: true,
    type: String,
  },

  description: {
    type: String,
    trim: true,
  },

  image_cover: {
    type: String,
    required: [true, 'A tour must have a cover images'],
  },

  start_dates: [Date],

  created_at: {
    type: Date,
    default: Date.now(),
  },

  images: [String],

  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tour_schema);

module.exports = Tour;
