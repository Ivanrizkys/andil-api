const bcrypt = require("bcryptjs");

const generateSalt = (rounds) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(rounds, (err, salt) => {
			if (err) reject(err);
			resolve(salt);
		});
	});
};

const generateHash = (salt, password) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) reject(err);
			resolve(hash);
		});
	});
};

module.exports = {
	genSalt: generateSalt,
	genHash: generateHash,
};
