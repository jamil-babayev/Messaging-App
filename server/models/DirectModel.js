const mongoose = require('mongoose');

const directSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

directSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'directId',
});

const Direct = mongoose.model('Direct', directSchema);
module.exports = Direct;
