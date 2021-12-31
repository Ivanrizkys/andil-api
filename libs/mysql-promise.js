const db = require("./db");

const insertDatabase = (table, column, value) => {
	return new Promise((resolve, reject) => {
		const values = [...value];
		const query = `INSERT INTO ${table} (${column}) VALUES (${values})`;
		console.log(query);
		const insert = db.query(query, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});
};

const selectDatabase = (table, column, limit) => {
	return new Promise((resolve, reject) => {
		const col = column === "*" ? "*" : `(${column})`;
		const query = limit
			? `SELECT ${col} FROM ${table} LIMIT ${limit}`
			: `SELECT ${col} FROM ${table}`;
		const select = db.query(query, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
		console.log(select.sql);
	});
};

// const selectWhere = (table, column, limit, where) => {
//     return new Promise((resolve, reject) => {
//         const col = column === "*" ? "*" : `(${column})`;
//         const query = limit ? `SELECT ${col} FROM ${table} LIMIT ${limit}` : `SELECT ${col} FROM ${table} WHERE `;
//     })
// }

module.exports = {
	dbInsert: insertDatabase,
	dbSelect: selectDatabase,
};
