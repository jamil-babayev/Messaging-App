const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  sended: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  received: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sendedAt: {
    type: Date,
    default: Date.now(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const Request = new mongoose.model('Request', requestSchema);
module.exports = Request;
