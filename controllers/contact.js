const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const Contact = require('../model/Contact');

// @desc    GET All contacts
// @route   GET /api/v1/contacts/
// @access  Private
exports.getAllContacts = async (req, res) => {
	try {
		const contacts = await Contact.find({});

		res.status(200).json({
			success: true,
			count: contacts.length,
			contacts,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    GET Single contact by id
// @route   GET /api/v1/contacts/:id
// @access  Private
exports.getContactById = async (req, res) => {
	try {
		const contacts = await Contact.findById(req.params.id);

		res.status(200).json({
			success: true,
			contacts,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    POST Add single contact manually
// @route   POST /api/v1/contact/
// @access  Private
exports.addContact = async (req, res) => {
	const { email } = req.body;

	try {
		let contacts = await Contact.findOne({ email });

		// check: if contact exists
		if (contacts) {
			throw new Error('Email already exists');
		}

		//
		contacts = await Contact.create(req.body);
		res.status(200).json({
			success: true,
			contacts,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    POST Upload contacts through CSV file
// @route   POST /api/v1/contacts/upload
// @access  Private
exports.uploadContacts = async (req, res) => {
	if (req.file) {
		console.log(`CSV file imported successfully`);
	}

	const allContacts = [];

	try {
		const filePath = path.join(
			__dirname,
			'../',
			'/public/csv/' + req.file.filename
		);

		fs.createReadStream(filePath)
			.pipe(csv.parse({ headers: true }))
			.on('error', (err) => console.log(err))
			.on('data', (row) => allContacts.push(row))
			.on('end', async (rowCount) => {
				try {
					const contacts = await Contact.insertMany(allContacts);

					// Delete the CSV file after importing data
					fs.unlink(filePath, (err) => {
						if (err) {
							console.error('Error deleting CSV file:', err);
						} else {
							console.log('CSV file deleted successfully');
						}
					});

					res.status(200).json({
						success: true,
						message: 'Contacts are imported successfully',
						count: contacts.length,
						contacts,
					});
				} catch (error) {
					return res.status(400).json(error);
				}
			});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}
};

// @desc    PUT Update single contact
// @route   PUT /api/v1/contacts/:id
// @access  Private
exports.updateContact = async (req, res) => {
	try {
		const contacts = await Contact.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidators: true,
				new: true,
			}
		);

		res.status(200).json({
			success: true,
			contacts,
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    DELETE Single contact
// @route   DELETE /api/v1/contacts/:id
// @access  Private
exports.deleteContact = async (req, res) => {
	try {
		const contacts = await Contact.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: {},
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    DELETE All contacts
// @route   DELETE /api/v1/contacts/
// @access  Private
exports.deleteContacts = async (req, res) => {
	try {
		const contacts = await Contact.deleteMany({});
		res.status(200).json({
			success: true,
			message: {},
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};
