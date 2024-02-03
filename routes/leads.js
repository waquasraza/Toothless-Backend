const express = require('express');

const router = express.Router();
const {
	getAllLeads,
	getLeadById,
	addLead,
	updateLead,
	deleteLead,
} = require('../controllers/leads');

router.route('/').get(getAllLeads).post(addLead);
router.route('/:id').get(getLeadById).put(updateLead).delete(deleteLead);

module.exports = router;
