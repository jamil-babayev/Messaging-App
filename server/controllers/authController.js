const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('./../models/UserModel');
const AppError = require('./../utils/appError');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, SENDGRID_API_KEY } =
  process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// TO SIGN A TOKEN
const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { userName, email, password, passwordConfirm } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError('User already exists.', 400));
    const user = await User.create({
      userName,
      email,
      password,
      passwordConfirm,
    });

    const token = signToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: false, // SET TO TRUE ON DEPLOYMENT
      secure: true, // SET TO TRUE ON DEPLOYMENT
      sameSite: 'None',
    });

    res.status(201).json({
      status: 'success',
      token,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError('Please provide email and password', 400));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError('Incorrect email or password', 401));

    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(new AppError('Incorrect email or password', 401));

    const token = signToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: false, // SET TO TRUE ON DEPLOYMENT
      secure: true, // SET TO TRUE ON DEPLOYMENT
      sameSite: 'None',
    });

    res.status(201).json({
      status: 'success',
      token,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AppError('Token does not exists.', 400));
  }
  jwt.verify(token, JWT_SECRET, async (err, data) => {
    if (err) {
      return next(new AppError('Error on verification of token'));
    } else {
      const user = await User.findById(data.id);
      if (user) return res.status(200).json({ status: 'success', user });
      return next(new AppError('User does not exists.'));
    }
  });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return next(new AppError('There is no user with given email.', 404));

    const resetToken = crypto.randomBytes(32).toString('hex');

    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:3000/reset/${resetToken}`;

    const msg = {
      to: req.body.email,
      from: 'cemilsalyan2004@hotmail.com',
      subject: `password reset`,
      text: `Click to reset password: ${resetURL}`,
    };
    await sgMail.send(msg);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
      url: resetURL,
    });
  } catch (err) {
    return next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password, passwordConfirm } = req.body;
    console.log({ password, passwordConfirm });
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = signToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: false, // SET TO TRUE ON DEPLOYMENT
      secure: true, // SET TO TRUE ON DEPLOYMENT
      sameSite: 'None',
    });

    res.status(201).json({
      status: 'success',
      token,
      user,
    });
  } catch (err) {
    // return next(new AppError('Error on reset password', 500));
    return next(err);
  }
};
