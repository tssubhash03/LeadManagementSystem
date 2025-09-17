const express = require('express');
const router = express.Router();

const { createLead, listLeads, getLeadById } = require('../controllers/leadController');

// POST /leads → Create a lead
router.post('/', createLead);

// GET /leads → List leads with pagination & filters
router.get('/', listLeads);

// GET /leads/:id → Fetch a single lead by ID
router.get('/:id', getLeadById);

module.exports = router;


