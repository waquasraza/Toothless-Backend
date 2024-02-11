const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
	// extract token from header
	const token = req.headers.authorization.split(' ')[1];

	// check token exists
	if (!token) {
		return res.status(400).json({
			success: false,
			err: 'Session expired, Please login',
		});
	}

	try {
		// decode token
		const decode = jwt.verify(token, process.env.JWT_SECRET);

		if (!decode) {
			return res.status(400).json({
				success: false,
				err: 'something went wrong, Please try again!',
			});
		}

		// find user
		const user = await User.findOne({ _id: decode.id });

		// set user in request
		req.user = user;
		req.token = token;
		next();
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};
