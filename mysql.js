var mysql = require("mysql2");
var pool = mysql.createPool({
  user: "root",
  password: "",
  database: "cyberprojectde",
  host: "localhost",
  port: 3306,
});

exports.pool = pool;
