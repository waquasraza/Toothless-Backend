const mongoose = require('mongoose');

const connect = () => {
	try {
		mongoose.connect(process.env.MONGO_URI, { dbName: 'Toothless' });
		console.log('Database successfully connected');
	} catch (err) {
		console.log(err);
	}
};

module.exports = connect;
