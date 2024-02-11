const express = require('express');
const router = express.Router();

const {
	handleRegister,
	handleLogin,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} = require('../controllers/user');

router.route('/').get(getUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.route('/register').post(handleRegister);
router.route('/login').post(handleLogin);

module.exports = router;
