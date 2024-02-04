const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;
const dbConnection = require('./config/db');

const contactsRoute = require('./routes/contact');

// db connection
dbConnection();

// app middlewares
app.use(express.json());
app.use(morgan('dev'));

// leads route
app.use('/api/v1/contacts', contactsRoute);

// listen server
app.listen(PORT, () => {
	console.log(`Server is runnning on PORT: ${PORT}`);
});
