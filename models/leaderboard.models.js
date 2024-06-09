const db = require("../db/index.js");

exports.selectLeaderboard = () => {
  return db.query("SELECT * FROM leaderboard;").then((result) => result.rows);
};

exports.selectSingleUserOnLeaderboard = (user_id) => {
  return db.query("SELECT * FROM leaderboard WHERE user_id = $1;", [user_id]).then((result) => result.rows[0]);
};

exports.insertLeaderboard = (newUser) => {
  const { score, user_id } = newUser;
  return db.query("INSERT INTO leaderboard (score, user_id) VALUES ($1, $2) RETURNING *;", [score, user_id]).then(({ rows }) => rows[0]);
};
