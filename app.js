const cors = require("cors");
const express = require("express");
const authrouter = require("./src/auth/router");
const testapi = require('./src/test/router');

const app = express();
const port = process.env.PORT || 3000;

// * cors
app.use(cors());

// * request parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * user api
app.use("/user", authrouter);

// * test api
app.use(testapi);

app.listen(port, () => {
	console.log(`🚀 Server ready at: http://localhost:${port}`);
});
