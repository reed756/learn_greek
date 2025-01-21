import db from "../db/index.js";

export const selectUsers = async () => {
  const result = await db.query("SELECT * FROM users;");
  return result.rows;
};

export const selectUser = async (user_id) => {
  const result = await db.query("SELECT * FROM users WHERE user_id = $1;", [user_id]);
  if (!result.rows[0]) throw { status: 404, msg: `No user found for user_id: ${user_id}` };
  return result.rows[0];
};
