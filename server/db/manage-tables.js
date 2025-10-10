import db from './index.js';

export const dropTables = () => {
  return db.query(
    `DROP TABLE IF EXISTS alphabet;
     DROP TABLE IF EXISTS leaderboard;
     DROP TABLE IF EXISTS users;`
  );
};

export const createTables = () => {
  return db.query(
    `CREATE TABLE if not exists alphabet (
      alphabet_id SERIAL PRIMARY KEY,
      greek_letter VARCHAR(50) NOT NULL,
      lower_case_letter VARCHAR(5) NOT NULL,
      upper_case_letter VARCHAR(5) NOT NULL,
      phonetic_equivalent VARCHAR(50) NOT NULL,
      pronounced_as VARCHAR(50) NOT NULL
    );
    CREATE TABLE if not exists users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email_address VARCHAR(50) NOT NULL
    );
    CREATE TABLE if not exists leaderboard (
      leaderboard_id SERIAL PRIMARY KEY,
      score SMALLINT DEFAULT 0,
      user_id SMALLINT NOT NULL REFERENCES users(user_id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
};
