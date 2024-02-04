const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const {
	getAllContacts,
	getContactById,
	addContact,
	updateContact,
	deleteContact,
	deleteContacts,
	uploadContacts,
} = require('../controllers/contact');

// multer config
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (!fs.existsSync('public')) {
			fs.mkdirSync('public');
		}

		if (!fs.existsSync('public/csv')) {
			fs.mkdirSync('public/csv');
		}

		cb(null, 'public/csv');
	},

	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		const ext = path.extname(file.originalname);

		if (ext !== '.csv') {
			return cb(new Error('Only SVG files are allowed'));
		}

		cb(null, true);
	},
});

// routes
router.route('/').get(getAllContacts).post(addContact).delete(deleteContacts);
router
	.route('/:id')
	.get(getContactById)
	.put(updateContact)
	.delete(deleteContact);
router.route('/upload').post(upload.single('upload'), uploadContacts);

module.exports = router;
