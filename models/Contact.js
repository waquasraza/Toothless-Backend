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


/*
contact type
timezone
tags
lists
company
industry
date of birth
custom fields
contact source
contact type - lead/customer

custom fields: 
address - 
map url


feature: 
smart list 
 - tag
 - list


Taxanomy - Category and tags

list - category


*/