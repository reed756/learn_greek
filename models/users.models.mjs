import db from "../db/index.js";

export const selectUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};

export const selectUser = (user_id) => {
  return db.query("SELECT * FROM users WHERE user_id = $1;", [user_id]).then((result) => result.rows[0]);
};
