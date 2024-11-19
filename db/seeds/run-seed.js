import seed from "./seed.js";
import { alphabet } from "../data/development-data/alphabet.js";
import { leaderboard } from "../data/development-data/leaderboard.js";
import { users } from "../data/development-data/users.js";

const itemData = {
  alphabetData: alphabet,
  leaderboardData: leaderboard,
  userData: users,
};

const runSeed = (itemData) => {
  return seed({ itemData });
};

runSeed(itemData);

export default runSeed;
