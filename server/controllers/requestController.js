const Request = require('./../models/RequestModel');
const User = require('./../models/UserModel');
const AppError = require('./../utils/appError');

exports.sendRequest = async (req, res, next) => {
  try {
    let queryObj = {};
    if (req.body.user) queryObj = { userName: req.body.user };
    else if (req.body._id) queryObj = { _id: req.body._id };
    const acceptedby = await User.findOne(queryObj);
    if (!acceptedby) return next(new AppError('Sended profile not found', 404));
    const request = await Request.create({
      sended: req.user._id,
      received: acceptedby._id,
      sendedAt: Date.now(),
      verified: false,
    });
    res.status(200).json({
      status: 'success',
      request: request,
    });
    return next();
  } catch (err) {
    // return next(new AppError('Error on send request', 500));
    return next(err);
  }
};

exports.removeRequest = async (req, res, next) => {
  try {
    const received = req.params.receiverId;
    const { _id } = req.user;
    const request = await Request.findOneAndDelete({ received, sended: _id });
    if (!request) return next(new AppError('Request not found', 404));
    res.status(200).json({
      status: 'success',
      message: 'deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};

exports.findRequest = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const request = await Request.find({ received: _id }).sort({
      sendedAt: -1,
    });
    if (!request) res.status(404).json({ message: 'Request not found' });
    res.status(200).json({
      status: 'success',
      request,
    });
  } catch (err) {
    return next(err);
  }
};

exports.declineRequest = async (req, res, next) => {
  try {
    const sended = req.params.senderId;
    const { _id } = req.user;
    const request = await Request.findOneAndDelete({ sended, received: _id });
    if (!request) return next(new AppError('Request not found', 404));
    res.status(200).json({
      status: 'success',
      message: 'deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};

exports.acceptRequest = async (req, res, next) => {
  try {
    const sended = req.params.senderId;
    const { _id } = req.user;
    const request = await Request.findOneAndUpdate(
      { sended, received: _id },
      { verified: true }
    );
    if (!request) return next(new AppError('Request not found', 404));
    res.status(200).json({
      status: 'success',
      message: 'request accepted',
    });
  } catch (err) {
    return next(err);
  }
};
