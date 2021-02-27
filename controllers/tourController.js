const Tour = require('./../models/tourModel');

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

// Return all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'sucess',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail again',
      message: e,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'sucess',
      data: {
        tour,
      },
    });
  } catch (error) {
    /* handle error */
    res.status(404).json({
      status: 'Fail',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  // create Tour
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    /* handle error */
    res.status(400).json({
      status: 'fail to save document',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(res.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    /* handle error */
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

//Delete Tours
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });

  } catch (erro) {
    /* handle error */
    res.status(404).json({
      status: 'fail to delete document',
      data: null,
    });
  }
};
