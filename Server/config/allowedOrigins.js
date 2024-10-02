// allowedOrigins.js
const dotenv = require('dotenv');

dotenv.config();

// Parse allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

module.exports = allowedOrigins;
