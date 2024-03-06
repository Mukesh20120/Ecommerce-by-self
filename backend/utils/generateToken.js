const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = ({res, userId}) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  return token;
};

module.exports = generateToken;