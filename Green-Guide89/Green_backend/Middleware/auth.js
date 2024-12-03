const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ status: false, message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
