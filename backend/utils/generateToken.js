const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = ({res, userId}) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  const oneDay = 30*24*60*60*1000;
  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now()+oneDay),
    secure: true,
    signed: true
  });
  // res.setHeader('Set-Cookie', `jwt=${token}; HttpOnly`);
};

module.exports = generateToken;