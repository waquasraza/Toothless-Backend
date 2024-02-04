const express = require('express');
const router = express.Router();

const { handleRegister } = require('../controllers/user');

router.route('/register').post(handleRegister);

module.exports = router;
