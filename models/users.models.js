const db = require("../db/index.js");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};
