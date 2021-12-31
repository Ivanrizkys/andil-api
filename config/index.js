const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	testing: process.env.test,
	jwtSecret: process.env.JWT_SECRET,
	dbHost: process.env.DB_HOST,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbDatabase: process.env.DB_DATABASE,
};
