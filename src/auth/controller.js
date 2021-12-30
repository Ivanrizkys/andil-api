const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");
const prisma = require("../../libs/prisma");
const { genSalt, genHash } = require("../../libs/bcrypt-promise");

module.exports = {
	signup: async (req, res) => {
		try {
			const { nama, email, password } = req.body;
			// * validating email
			const valEmail = await prisma.akun.findFirst({
				where: { email },
				select: { email: true },
			});
			if (valEmail) return res.status(422).send("Email is alredy used");
			// * generate password
			const salt = await genSalt(10);
			const hash = await genHash(salt, password);
			// * create new user
			const createUser = await prisma.akun.create({
				data: {
					nama,
					email,
					password: hash,
				},
			});
			res.status(200).json({
				succes: true,
				message: "Create account succesfully",
				data: createUser,
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
			console.log("masuk 1")
			const { email, password } = req.body;
			// * check email
			const checkEmail = await prisma.akun.findFirst({
				where: { email },
				select: {
					nama: true,
					email: true,
					password: true,
				},
			});
			console.log("masuk 2")
			if (!checkEmail) return res.status(401).send("Email not match");
			// * check password
			const checkPassword = await bcrypt.compare(
				password,
				checkEmail.password
			);
			console.log("masuk 3")
			if (!checkPassword) return res.status(401).send("Password incorect");
			// * generate token
			jwt.sign(
				{
					nama: checkEmail.nama,
					email: checkEmail.email,
				},
				jwtSecret,
				{
					expiresIn: "7d",
				},
				(err, token) => {
					console.log("masuk 4")
					if (err) return err;
					console.log("masuk 5")
					res.status(200).json({
						succes: true,
						message: "Login succesfully",
						data: {
							token,
							user: {
								nama: checkEmail.nama,
								email: checkEmail.email
							}
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
