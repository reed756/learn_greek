const db = require("./index.js");

exports.dropTables = () => {
  return db.query(`DROP TABLE IF EXISTS leaderboard;DROP TABLE IF EXISTS alphabet; DROP TABLE IF EXISTS users;
  `);
};

exports.createTables = () => {
  return db.query(
    `CREATE TABLE alphabet (
      alphabet_id SERIAL PRIMARY KEY,
      greek_letter VARCHAR(50) NOT NULL,
      phonetic_equivalent VARCHAR(50) NOT NULL,
      pronounced_as VARCHAR(50) NOT NULL
    );
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email_address VARCHAR(50) NOT NULL
    );
    CREATE TABLE leaderboard (
      leaderboard_id SERIAL PRIMARY KEY,
      score SMALLINT DEFAULT 0,
      user_id SMALLINT NOT NULL REFERENCES users(user_id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
};
