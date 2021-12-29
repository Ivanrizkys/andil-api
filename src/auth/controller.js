const prisma = require("../../libs/prisma");
const { genSalt, genHash } = require("../../libs/bcrypt-promise");

module.exports = {
	signup: async (req, res) => {
		try {
			const { nama, email, password } = req.body;
			if (!nama || !email || !password) return res.status(400).end();
			// * validating email
			const valEmail = await prisma.akun.findFirst({
				where: { email },
				select: { email: true },
			});
			if (valEmail) return res.status(422).end();
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
				message: "Create account succesfully",
				data: createUser,
			});
		} catch (err) {
			return res.status(500).json({
				succes: false,
				message: err.message || "Internal server error",
			});
		}
	},
	signin: async (req, res) => {
		res.status(200).json({
			message: "Login succesfully",
		});
	},
};
