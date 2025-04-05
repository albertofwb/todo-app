const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load env vars
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
