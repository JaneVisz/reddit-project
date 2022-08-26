const mysql = require("mysql");
const env = require("dotenv");
env.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error(`MySQL connection error: ${error.message}`);
    return;
  }
  console.log(`Connected to MySQL (id=${connection.threadId})`);
});

module.exports = connection;
