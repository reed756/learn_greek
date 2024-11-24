import db from "../db/index.js";

export const selectAlphabet = async () => {
  const result = await db.query("SELECT * FROM alphabet;");
  return result.rows;
};

export const selectCharacter = async (alphabet_id) => {
  const result = await db.query("SELECT * FROM alphabet WHERE alphabet_id = $1;", [alphabet_id]);
  if (!result.rows[0]) throw { status: 404, msg: `No character found for alphabet_id: ${alphabet_id}` };
  return result.rows[0];
};
