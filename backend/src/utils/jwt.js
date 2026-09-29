const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId: userId.toString(), type: 'access' },
    env.accessTokenSecret,
    { expiresIn: env.accessTokenExpiresIn }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId: userId.toString(), type: 'refresh' },
    env.refreshTokenSecret,
    { expiresIn: env.refreshTokenExpiresIn }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.accessTokenSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.refreshTokenSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
