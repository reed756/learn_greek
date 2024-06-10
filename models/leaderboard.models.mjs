import db from "../db/index.js";

export const selectLeaderboard = async () => {
  const result = await db.query("SELECT * FROM leaderboard;");
  return result.rows;
};

export const selectSingleUserOnLeaderboard = async (user_id) => {
  const result = await db.query("SELECT * FROM leaderboard WHERE user_id = $1;", [user_id]);
  return result.rows[0];
};

export const insertLeaderboard = async (newUser) => {
  const { score, user_id } = newUser;
  const { rows } = await db.query("INSERT INTO leaderboard (score, user_id) VALUES ($1, $2) RETURNING *;", [score, user_id]);
  return rows[0];
};

export const deleteLeaderboard = async (user_id) => {
  const result = await db.query("DELETE FROM leaderboard WHERE user_id = $1;", [user_id]);
  return result.rows[0];
};
