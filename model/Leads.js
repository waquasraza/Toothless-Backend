const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		unique: [true, 'This email is already in use'],
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
});

const lead = mongoose.model('Lead', leadSchema);

module.exports = lead;
