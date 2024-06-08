const db = require("../db/index.js");

exports.selectLeaderboard = () => {
  return db.query("SELECT * FROM leaderboard;").then((result) => result.rows);
};

exports.selectSingleUserOnLeaderboard = (user_id) => {
  return db.query("SELECT * FROM leaderboard WHERE user_id = $1;", [user_id]).then((result) => result.rows[0]);
};
