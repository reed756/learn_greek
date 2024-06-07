const db = require("../db/index.js");

exports.selectLeaderboard = () => {
  return db.query("SELECT * FROM leaderboard;").then((result) => result.rows);
};
