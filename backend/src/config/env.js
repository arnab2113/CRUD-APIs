const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'fallback_production_access_token_secret_key_2026_jwt',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fallback_production_refresh_token_secret_key_2026_jwt',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};
