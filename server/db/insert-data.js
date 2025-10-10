import format from 'pg-format';
import db from './index.js';

export const insertData = async (itemData) => {
  return db
    .query(
      format(
        `INSERT INTO users
        (name, email_address)
        VALUES
        %L
        RETURNING *;`,
        itemData.userData.map((item) => [item.name, item.emailAddress])
      )
    )
    .then(() => {
      return db.query(
        format(
          `INSERT INTO alphabet
          (greek_letter, lower_case_letter, upper_case_letter, phonetic_equivalent, pronounced_as)
          VALUES
          %L
          RETURNING *;`,
          itemData.alphabetData.map((item) => [
            item.greekLetter,
            item.lowerCaseLetter,
            item.upperCaseLetter,
            item.phoneticEquivalent,
            item.pronouncedAs
          ])
        )
      );
    })
    .then(() => {
      return db.query(
        format(
          `INSERT INTO leaderboard
          (score, user_id)
          VALUES
          %L
          RETURNING *;`,
          itemData.leaderboardData.map((item) => [item.score, item.userId])
        )
      );
    });
};
