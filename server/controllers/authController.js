import Admin from '../models/Admin.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import jwt from 'jsonwebtoken';

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse('Please provide a username and password', 400));
  }

  const admin = await Admin.findOne({ username }).select('+password');
  if (!admin) {
    return next(new ErrorResponse('Invalid username or password', 401));
  }

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid username or password', 401));
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {expiresIn: '30d'});

  res.status(200).json({ success: true, data: { _id: admin._id, username: admin.username,token}
    })
});