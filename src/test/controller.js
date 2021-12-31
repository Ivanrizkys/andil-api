const db = require("../../libs/db");

module.exports = {
	test: (req, res) => {
		// * test table akun
		const query = "SELECT * FROM Akun";
		db.query(query, (err, result) => {
			if (err) return res.status(400).send(err.message);
			res.status(200).json({
				message: "App running succesfully",
				data: result,
			});
		});
	},
};
