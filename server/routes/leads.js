const express = require('express');
const router = express.Router();
const { createLead } = require('../controllers/leadController');

// POST /leads → Create a lead
router.post('/', createLead);

module.exports = router;
