const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const foodRouter = require('./routes/foodRoute.js');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require('./routes/orderRoute.js');

dotenv.config();

// Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
connectDB();

// Allowed origins
const allowedOrigins = ['https://food-delivery-fullstack-frontend.vercel.app', 'https://food-delivery-fullstack-admin.vercel.app'];  // Add more origins as needed

// CORS middleware to allow multiple origins
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for image uploads
app.use("/images", express.static("uploads"));

// API endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
