const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tour_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must ave a name'],
      // validator: validator.isApha,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty can either be easy. medium or difficulty',
      },
    },
    slug: String,

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
    price_discount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount can not be greater than price',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tour_schema.virtual('duration_weeks').get(function () {
  return this.duration / 7;
});

tour_schema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tour_schema.pre('/^find/', function (docs, next) {
  this.find({ secret_tour: { $ne: true } });

  this.start = Date.now();
  next();
});

tour_schema.post('/^find/', function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`)
  console.log(docs);
  next();
});

tour_schema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { secret_tour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tour_schema);

module.exports = Tour;
