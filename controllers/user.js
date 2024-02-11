const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc    Register user
// @route   POST /api/v1/users/register
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

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
exports.handleLogin = async (req, res) => {
	const {email, password} = req.body;

	try{
		// check user exists
		let user = await User.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid Email' });
		}
		
		// check password
		const isPasswordMatch = await bcrypt.compare(password, user.password)

		if(!isPasswordMatch){
			return res
				.status(400)
				.json({ success: false, message: 'Invalid password' });
		}

		// generate jwt token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

		// response
		res.status(200).json({
			success: true,
			token
		});

	}catch(err){
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}

}

// @desc    Get All users
// @route   GET /api/v1/users/
// @access  Private - Admin
exports.getUsers = async (req, res) => {

	try {

		const users = await User.find({})

		res.status(200).json({
			success: true, 
			count: users.length,
			users
		})

	} catch (error) {
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}

}

// @desc    GET Single user by id
// @route   GET /api/v1/users/:id
// @access  Private - Admin
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    PUT Update single user
// @route   PUT /api/v1/users/:id
// @access  Private - Admin
exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidators: true,
				new: true,
			}
		);

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    DELETE Single user
// @route   DELETE /api/v1/users/:id
// @access  Private - Admin
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: {},
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};
