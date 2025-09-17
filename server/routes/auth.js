const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Public
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
