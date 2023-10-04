const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

// auth logic
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);

router
  .route('/findProfile/:profile')
  .get(authController.protect, userController.findProfile);
router
  .route('/getSingleProfile/:profile')
  .get(authController.protect, userController.getSingleProfile);
router
  .route('/getSingleProfileById/:id')
  .get(authController.protect, userController.getSingleProfileById);

router.route('/').post(authController.userVerification);

module.exports = router;
