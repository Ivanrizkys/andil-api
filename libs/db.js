const mysql = require("mysql");
const { dbHost, dbUser, dbPassword, dbDatabase } = require("../config");

var db = mysql.createConnection({
	host: dbHost,
	user: dbUser,
	password: dbPassword,
	database: dbDatabase,
});

db.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

module.exports = db;
