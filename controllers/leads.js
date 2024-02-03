const Leads = require('../model/Leads');

// @desc    GET all leads
// @route   GET /api/v1/leads/
// @access  Private
exports.getAllLeads = async (req, res) => {
	try {
		const leads = await Leads.find({});

		res.status(200).json({ success: true, count: leads.length, leads });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    GET single lead by id
// @route   GET /api/v1/leads/:id
// @access  Private
exports.getLeadById = async (req, res) => {
	try {
		const lead = await Leads.findById(req.params.id);

		res.status(200).json({
			success: true,
			lead,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    POST Add single lead manually
// @route   POST /api/v1/leads/
// @access  Private
exports.addLead = async (req, res) => {
	const { email } = req.body;

	try {
		let lead = await Leads.findOne({ email });

		// check: if lead exists
		if (lead) {
			throw new Error('Email already exists');
		}

		//
		lead = await Leads.create(req.body);
		res.status(200).json({
			success: true,
			lead,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    PUT Update single lead
// @route   PUT /api/v1/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
	try {
		const lead = await Leads.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		});

		res.status(200).json({
			success: true,
			lead,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    DELETE single lead
// @route   DELETE /api/v1/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
	try {
		const lead = await Leads.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: {},
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};
