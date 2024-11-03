// src/config/env.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  verifyToken: process.env.VERIFY_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
  phoneNumberId: process.env.PHONE_NUMBER_ID,
  appSecret: process.env.APP_SECRET,
  mongodbUri: process.env.MONGODB_URI,
};
