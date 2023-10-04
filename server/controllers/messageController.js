const Direct = require('../models/DirectModel');
const Message = require('../models/MessageModel');
const AppError = require('./../utils/appError');

exports.findOrCreate = async (req, res, next) => {
  try {
    const { members } = req.body;
    const direct = await Direct.findOne({ members: { $all: members } })
      .populate({
        path: 'messages',
        options: { limit: 40, sort: { sendedAt: -1 } },
      })
      .limit(2);
    if (direct) {
      res.status(200).json({
        message: 'success',
        direct,
      });
    } else {
      const direct = await Direct.create({ members });
      res.status(201).json({
        message: 'success',
        direct,
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.findDirectById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const direct = await Direct.findById(_id)
      .populate('members')
      .populate({
        path: 'messages',
        options: { limit: 40, sort: { sendedAt: -1 } },
      });
    if (!direct) return next(new AppError());
    res.status(200).json({
      status: 'success',
      direct,
    });
  } catch (err) {
    return next(err);
  }
};

exports.writeMessage = async (req, res, next) => {
  try {
    const { directId, receiverId, content } = req.body;
    const { _id: senderId } = req.user;
    const message = await Message.create({
      directId,
      receiverId,
      senderId,
      content,
    });
    res.status(200).json({
      message: 'success',
      message,
    });
  } catch (err) {
    return next(err);
  }
};
