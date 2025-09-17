const express = require('express');
const router = express.Router();
// const { createLead } = require('../controllers/leadController');
const { createLead, listLeads } = require('../controllers/leadController');

// POST /leads → Create a lead
router.post('/', createLead);

// GET /leads → List leads with pagination & filters
router.get('/', listLeads);

module.exports = router;


