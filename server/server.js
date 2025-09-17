const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const leadRoutes = require('./routes/leads');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => res.send('Lead Management System API is running'));

// Import Lead Routes

// Use lead routes
app.use('/leads', leadRoutes);


// Use auth routes
app.use('/auth', authRoutes);

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
