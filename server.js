const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');

const app = express();
const PORT = process.env.PORT;

const dbConnection = require('./config/db');
const contactsRoute = require('./routes/contact');
const userRoute = require('./routes/user');

// db connection
dbConnection();

// app middlewares
app.use(express.json());
app.use(morgan('dev'));

// contacts route
app.use('/api/v1/contacts', contactsRoute);

// user route
app.use('/api/v1/auth', userRoute);

// listen server
app.listen(PORT, () => {
	console.log(`Server is runnning on PORT: ${PORT}`.green);
});
