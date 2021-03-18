const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID)

// router.route('/best-5').get(tourController.best_5, tourController.getAllTours);

router
  .route('/')
  .get(tourController.get_all_tours)
  .post(tourController.createTour);

router.route('/tours-stats').get(tourController.get_tour_stats);
router.route('/montly-plan/:year').get(tourController.get_monthly_plan);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
