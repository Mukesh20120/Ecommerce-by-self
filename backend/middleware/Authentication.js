const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/AsyncWrapper')
require('dotenv').config();
const {User} = require('../models')
const customApiError = require('../errors')

const protected = asyncWrapper(async(req,res,next) => {
  let token = req.cookie;
  console.log(token);
  if(!token){
    throw new customApiError.NotFoundError('Token not found please provide token');
  }
  const {userId} = jwt.verify(token,process.env.JWT_SECRET);
  const user = await User.findById(userId).select('-password')
  req.user = user;
  next();
})

const verifyAdmin = asyncWrapper(async(req,res,next)=>{
   if(req.user && !req.user.isAdmin){
    throw new customApiError.UnauthorizedError('you are not permitted to use this data');
   }
   next();
})

module.exports = {protected,verifyAdmin};