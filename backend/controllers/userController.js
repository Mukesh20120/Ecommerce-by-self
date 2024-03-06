const asyncWrapper = require("../middleware/AsyncWrapper");
const {User} = require('../models');
const {StatusCodes} = require('http-status-codes');
const customApiError = require('../errors');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken')
require('dotenv').config();

const authUser = asyncWrapper(async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken({res,userId: user._id});
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
const registerUser = asyncWrapper(async(req, res) => {
  const {name,email,password} = req.body;
  const existingUser = await User.findOne({email});
  if(existingUser){
    throw new customApiError.NotFoundError('This email already registered');
  }
  const user = await User.create({name,email,password});
  generateToken({res,userId: user._id});
  res.status(200).json({name: user.name,email: user.email,role: user.isAdmin});
});
const logoutUser = asyncWrapper((req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    sameSite: 'None', // Prevent CSRF attacks
    maxAge:  Date.now() 
  });
  // res.setHeader('Set-Cookie', `jwt=; HttpOnly`);
  res.status(200).send('log out successfully');
});
const getUserProfile = asyncWrapper(async(req, res) => {
  const {_id: userId} = req.user;
  const user = await User.findOne({_id: userId});
  res.status(200).json({name: user.name,email:user.email,role: user.isAdmin});
});
const updateUserProfile = asyncWrapper(async(req, res) => {
  const {_id: userId} = req.user;
  const user = await User.findOne({_id: userId});
  if(!user){
    throw new customApiError.NotFoundError('not able to find the user try later');
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if(req.body.password){
    user.password = req.body.password;
  }
  console.log('running in update user');
  const updateUser = await user.save();
  res.status(200).json({name: updateUser.name,email: updateUser.email,role: updateUser.isAdmin});
});

const getUsers = asyncWrapper(async(req, res) => {
  const users = await User.find({});
  res.status(200).json({Count: users.length,users});
});
const deleteUser = asyncWrapper((req, res) => {
  res.status(200).json({ msg: "deleteUser" });
});
const getUserById = asyncWrapper((req, res) => {
  res.status(200).json({ msg: "getUserById" });
});
const updateUser = asyncWrapper((req, res) => {
  res.status(200).json({ msg: "updateUser" });
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  deleteUser,
  updateUser,
  getUsers,
  updateUserProfile
};
