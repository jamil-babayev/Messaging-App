const express = require('express');
const authController = require('./../controllers/authController');
const requestController = require('./../controllers/requestController');

const router = express.Router();

router
  .route('/sendRequest')
  .post(authController.protect, requestController.sendRequest);

router
  .route('/removeRequest/:receiverId')
  .delete(authController.protect, requestController.removeRequest);

router
  .route('/declineRequest/:senderId')
  .delete(authController.protect, requestController.declineRequest);

router
  .route('/acceptRequest/:senderId')
  .get(authController.protect, requestController.acceptRequest);

router
  .route('/findRequest')
  .get(authController.protect, requestController.findRequest);

module.exports = router;
