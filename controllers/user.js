const User = require('../model/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.handleRegister = async (req, res) => {
	const { email } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			throw new Error('User already registered');
		}

		user = new User(req.body);
		user = await user.save();

		res.status(200).json({
			success: true,
			message: 'User successfully registered',
			user,
		});
	} catch (err) {
		// if any err..
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}
};
