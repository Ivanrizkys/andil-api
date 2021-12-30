const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    testing: process.env.test,
    jwtSecret: process.env.JWT_SECRET
}