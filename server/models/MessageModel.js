const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  directId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Direct',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  sendedAt: {
    type: Date,
    default: Date.now()
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
