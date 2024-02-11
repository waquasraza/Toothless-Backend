const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	gender: {
		type: String,
	},
	nationality: {
		type: String,
	},
});

module.exports = mongoose.model('Contact', contactSchema);
