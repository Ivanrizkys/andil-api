const cors = require("cors");
const express = require("express");
const authrouter = require("./src/auth/router");

const app = express();
const port = process.env.PORT || 3000;

// * cors
app.use(cors());

// * request parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * user api
app.use("/user", authrouter);

app.listen(port, () => {
	console.log(`🚀 Server ready at: http://localhost:${port}`);
});
