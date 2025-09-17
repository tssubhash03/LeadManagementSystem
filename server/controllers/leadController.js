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
