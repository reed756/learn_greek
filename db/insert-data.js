import format from "pg-format";
import db from "./index.js";

const users = [
  ["James Reed", "reedandj1@gmail.com"],
  ["Test User", "test@test.test"],
];

const alphabet = [
  ["Α α - Alpha", "a", "a in father"],
  ["Β β - Beta", "v", "v in victory"],
  ["Γ γ - Gamma", "y", "y in yes"],
  ["Δ δ - Delta", "th", "th in they"],
  ["Ε ε - Epsilon", "e", "e in red"],
  ["Ζ ζ - Zeta", "z", "z in zero"],
  ["Η η - Eta", "i", "i in ill or machine"],
  ["Θ θ - Theta", "th", "th in thin"],
  ["Ι ι - Iota", "i", "i in ill or machine"],
  ["Κ κ - Kappa", "k", "k in king"],
  ["Λ λ - Lambda", "l", "l in lot"],
  ["Μ μ - mu", "m", "m in mother"],
  ["Ν ν - nu", "n", "n in now"],
  ["Ξ ξ - xi", "x , ks", "x in extra"],
  ["Ο ο - Omicron", "o", "o in corporal"],
  ["Π π - Pi", "p", "p in paper"],
  ["Ρ ρ - Rho", "r", "r in red"],
  ["Σ σ/ς - Sigma", "s", "s in sister"],
  ["Τ τ - Tau", "t", "t in tin"],
  ["Υ υ - Upsilon", "i", "i in ill or machine"],
  ["Φ φ - Phi", "f", "f in fat"],
  ["Χ χ - Chi", "h", "h in hill"],
  ["Ψ ψ - Psi", "ps", "ps in lips"],
  ["Ω ω - Omega", "o", "o in corporal"],
];

const leaderboard = [
  [100, 1],
  [50, 2],
];

const usersInsertStr = format(
  `INSERT INTO users
    (name, email_address)
  VALUES
    %L
  RETURNING *;`,
  users
);
const alphabetInsertStr = format(
  `INSERT INTO alphabet
    (greek_letter, phonetic_equivalent, pronounced_as)
  VALUES
    %L
  RETURNING *;`,
  alphabet
);
const leaderboardInsertStr = format(
  `INSERT INTO leaderboard
    (score, user_id)
  VALUES
    %L
  RETURNING *;`,
  leaderboard
);

export const insertData = async () => {
  await db.query(usersInsertStr);
  await db.query(alphabetInsertStr);
  return await db.query(leaderboardInsertStr);
};
