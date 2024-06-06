const db = require("../db/index.js");

exports.selectAlphabet = () => {
  return db.query("SELECT * FROM alphabet;").then((result) => result.rows);
};

exports.selectCharacter = (alphabet_id) => {
  return db.query("SELECT * FROM alphabet WHERE alphabet_id = $1;", [alphabet_id]).then((result) => result.rows[0]);
};
