const Lead = require('../models/Lead');

// Create Lead Controller
exports.createLead = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      company,
      city,
      state,
      source,
      status,
      score,
      lead_value,
      last_activity_at,
      is_qualified
    } = req.body;

    // Basic validation (you can expand later)
    if (!first_name || !email || !source) {
      return res.status(400).json({ message: 'First name, email, and source are required' });
    }

    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({ message: 'Lead with this email already exists' });
    }

    const newLead = new Lead({
      first_name,
      last_name,
      email,
      phone,
      company,
      city,
      state,
      source,
      status,
      score,
      lead_value,
      last_activity_at,
      is_qualified
    });

    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', data: newLead });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.listLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, ...filters } = req.query;
    const query = {};

    // Example: Filter by email (contains)
    if (filters.email) {
      query.email = { $regex: filters.email, $options: 'i' };
    }

    if (filters.company) {
      query.company = { $regex: filters.company, $options: 'i' };
    }

    if (filters.city) {
      query.city = { $regex: filters.city, $options: 'i' };
    }

    if (filters.source) {
      query.source = { $in: filters.source.split(',') };
    }

    if (filters.status) {
      query.status = { $in: filters.status.split(',') };
    }

    if (filters.is_qualified) {
      query.is_qualified = filters.is_qualified === 'true';
    }

    if (filters.score_gt) {
      query.score = { ...query.score, $gt: Number(filters.score_gt) };
    }

    if (filters.score_lt) {
      query.score = { ...query.score, $lt: Number(filters.score_lt) };
    }

    if (filters.lead_value_gt) {
      query.lead_value = { ...query.lead_value, $gt: Number(filters.lead_value_gt) };
    }

    if (filters.lead_value_lt) {
      query.lead_value = { ...query.lead_value, $lt: Number(filters.lead_value_lt) };
    }

    if (filters.created_at_after) {
      query.created_at = { ...query.created_at, $gt: new Date(filters.created_at_after) };
    }

    if (filters.created_at_before) {
      query.created_at = { ...query.created_at, $lt: new Date(filters.created_at_before) };
    }

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ created_at: -1 });

    res.json({
      data: leads,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const leadId = req.params.id;

    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ data: lead });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    const updates = req.body;

    // Automatically update `updated_at`
    updates.updated_at = new Date();

    const updatedLead = await Lead.findByIdAndUpdate(leadId, updates, { new: true });

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead updated successfully', data: updatedLead });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

