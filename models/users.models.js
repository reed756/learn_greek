const db = require("../db/index.js");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};

exports.selectUser = (user_id) => {
  return db.query("SELECT * FROM users WHERE user_id = $1;", [user_id]).then((result) => result.rows[0]);
};
