const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");
const db = require("../../libs/db");
const { dbInsert } = require("../../libs/mysql-promise");
const { genSalt, genHash } = require("../../libs/bcrypt-promise");

module.exports = {
	signup: async (req, res) => {
		try {
			const { nama, email, password } = req.body;
			// * validating email
			const valEmailQuery = () => {
				return new Promise((resolve, reject) => {
					db.query(
						"SELECT email FROM Akun WHERE email = ?",
						[email],
						(err, result) => {
							if (err) reject(err);
							resolve(result);
						}
					);
				});
			};
			const valEmail = await valEmailQuery();
			if (valEmail.length >= 1)
				return res.status(422).send("Email is alredy used");
			// * generate password
			const salt = await genSalt(10);
			const hash = await genHash(salt, password);
			// * create new user
			const createUser = await dbInsert(
				"Akun",
				["nama", "email", "password"],
				[`'${nama}'`, `'${email}'`, `'${hash}'`]
			);
			res.status(200).json({
				succes: true,
				message: "Create account succesfully",
			});
		} catch (err) {
			return res.status(500).json({
				succes: false,
				message: err.message || "Internal server error",
				data: null,
			});
		}
	},
	signin: async (req, res) => {
		try {
			const { email, password } = req.body;
			// * check email
			const checkEmailQuery = () => {
				return new Promise((resolve, reject) => {
					db.query(
						"SELECT * FROM Akun WHERE email = ?",
						[email],
						(err, result) => {
							if (err) reject(err);
							resolve(result);
						}
					);
				});
			};
			const checkEmail = await checkEmailQuery();
			if (checkEmail.length < 1)
				return res.status(401).send("Email not match");
			// * check password
			const checkPassword = await bcrypt.compare(
				password,
				checkEmail[0].password
			);
			if (!checkPassword)
				return res.status(401).send("Password incorect");
			// * generate token
			jwt.sign(
				{
					nama: checkEmail[0].nama,
					email: checkEmail[0].email,
				},
				jwtSecret,
				{
					expiresIn: "7d",
				},
				(err, token) => {
					if (err) return err;
					res.status(200).json({
						succes: true,
						message: "Login succesfully",
						data: {
							token,
							user: {
								nama: checkEmail[0].nama,
								email: checkEmail[0].email,
							},
						},
					});
				}
			);
		} catch (err) {
			return res.status(500).json({
				succes: false,
				message: err.message || "Internal server error",
				data: null,
			});
		}
	},
};
