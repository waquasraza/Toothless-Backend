const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
	},
	role: {
		type: String,
		enum: ['staff', 'admin'],
		default: 'staff',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

// hash password pre save user
userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;

		return next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model('User', userSchema);
