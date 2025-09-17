const express = require('express');
const router = express.Router();


const { createLead, listLeads, getLeadById, updateLead } = require('../controllers/leadController');

// POST /leads → Create a lead
router.post('/', createLead);

// GET /leads → List leads with pagination & filters
router.get('/', listLeads);

// GET /leads/:id → Fetch a single lead by ID
router.get('/:id', getLeadById);

// PUT /leads/:id → Update a lead by ID
router.put('/:id', updateLead);

module.exports = router;


