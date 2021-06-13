const express = require('express');
const tourController = require('./../controllers/tourController');
const AuthController = require('../controllers/auth_controller');

const router = express.Router();

// router.param('id', tourController.checkID)

// router.route('/best-5').get(tourController.best_5, tourController.getAllTours);

router
  .route('/')
  .get(AuthController.protect,tourController.get_all_tours)
  .post(tourController.create_tour);

router.route('/tours-stats').get(tourController.get_tour_stats);
router.route('/montly-plan/:year').get(tourController.get_monthly_plan);

router
  .route('/:id')
  .get(tourController.get_tour)
  .patch(tourController.updateTour)
  .delete(
    AuthController.protect,
    AuthController.rescrit_to('admin','guide'),
    tourController.deleteTour
  );

module.exports = router;
