import jwt from 'jsonwebtoken';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import Admin from '../models/Admin.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer '))
  {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token)
  {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try
  {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const admin = await Admin.findById(decoded.id);

    if (!admin)
    {
    return next(new ErrorResponse('Not authorized', 401))
    }
    req.admin = admin;
    next();

  } catch (err)
  {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
})