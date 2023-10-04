const express = require('express');
const authController = require('./../controllers/authController');
const messageController = require('./../controllers/messageController');

const router = express.Router();

router
  .route('/findOrCreate')
  .post(authController.protect, messageController.findOrCreate);

router
  .route('/findDirectById/:_id')
  .get(authController.protect, messageController.findDirectById);

router
  .route('/writeMessage')
  .post(authController.protect, messageController.writeMessage);

module.exports = router;
