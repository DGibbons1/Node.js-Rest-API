// Require MySQL
const mysql = require("mysql");
// Require database configuration
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Open the conection to MySQL database
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Export database connection
module.exports = connection;