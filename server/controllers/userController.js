const User = require('./../models/UserModel');
const AppError = require('./../utils/appError');

exports.findProfile = async (req, res, next) => {
  try {
    const { profile } = req.params;
    const user = await User.find({
      userName: { $regex: `^${profile}`, $options: 'i' },
    });
    if (!user) return next(new AppError('Profile not found', 404));
    res.status(200).json({
      status: 'success',
      profiles: user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getSingleProfile = async (req, res, next) => {
  try {
    const { profile } = req.params;
    const user = await User.findOne({ userName: profile })
      .populate('sendedRequest')
      .populate('receivedRequest');

    if (!user) return next(new AppError('Profile not found', 404));
    res.status(200).json({
      status: 'success',
      profile: user,
      sendedRequest: user.sendedRequest,
      receivedRequest: user.receivedRequest,
    });
  } catch (err) {
    return next(new AppError('Profile not found', 404));
  }
};

exports.getSingleProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate('sendedRequest')
      .populate('receivedRequest');

    if (!user) return next(new AppError('Profile not found', 404));
    res.status(200).json({
      status: 'success',
      user,
      followers: user.receivedRequest,
      following: user.sendedRequest,
    });
  } catch (err) {
    return next(new AppError('Profile not found', 404));
  }
};
