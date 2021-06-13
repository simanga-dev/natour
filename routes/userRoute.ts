const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('../controllers/auth_controller')


const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgot-password', authController.forgot_password)
router.put('/reset-password/token', authController.reset_password)

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser)


router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router
