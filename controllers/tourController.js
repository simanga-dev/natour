const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/api_features');
const catchAsync = require('../utils/catch_async');
const AppErro = require('../utils/app_erro');

// exports.checkID = (req, res, next, val) => {
//   console.log(`just to see if ${val}`);
//   if (parseInt(val) > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'inavlid id',
//     });
//   }

//   next();
// };

exports.best_5 = (req, res, next, val) => {
  req.query.limit = '5';
  req.query.sort = '-rating_average, price';
  req.query.fields = 'name,price,rating_average,summary,difficulty';
  next();
};

// Return all tours
exports.get_all_tours = catchAsync(async (req, res, next) => {
  const api_features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const tours = await api_features.query;

  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.get_tour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) return next(new AppErro('No tour found with that ID', 404));

  res.status(200).json({
    status: 'sucess',
    data: {
      tour,
    },
  });
});

exports.create_tour = catchAsync(async (req, res, next) => {
    console.log(req.body)
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'sucess',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(res.params.id, req.body, {
    new: true,
    runValidators: true,
  });
    
  if (!tour) return next(new AppErro('No tour found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

//Delete Tours
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) return next(new AppErro('No tour found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.get_tour_stats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { rating_average: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        num_tours: { $sum: 1 },
        avg_rating: { $avg: '$rating_average' },
        num_rating: { $sum: '$rating_quantity' },
        avg_price: { $avg: '$price' },
        nin_price: { $min: '$price' },
        max_price: { $max: '$price' },
      },
    },
    {
      $sort: { avg_price: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
  // 0610640868
  // 0610640868
});

exports.get_monthly_plan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$start_dates',
    },
    {
      $match: {
        start_dates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$start_dates' },
        num_tour_starts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { num_tour_starts: -1 },
    },
  ]);

  console.log(plan);
  res.status(200).json({
    status: 'success',
    data: plan,
  });
});
