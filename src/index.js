require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 3000;

server
	.start({
		port
	})
	.then(app => {
		console.log(`Server running on ${port}`);
	})
	.catch(err => console.error(err));
