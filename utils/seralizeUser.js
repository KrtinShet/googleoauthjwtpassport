const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');

exports.seralizeUser = async (req, res, next) => {
  const token = req.cookies['jwt'];
  if (token) {
    try {
      const decoded = await jwt.verify(token, 'secret');
      const user = await User.findById(decoded.uid);
      req.user = user;
      res.locals.user = user;
    } catch (err) {
      return next();
    }
  }
  next();
};
