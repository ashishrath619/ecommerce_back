var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123",
  database: "ecom",
  connectionLimit: "100",
});
module.exports = pool;
