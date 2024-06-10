import express from "express";
import { getUsers, getUser } from "./controllers/users.controllers.mjs";
import { getAlphabet, getCharacter } from "./controllers/alphabet.controllers.mjs";
import { getLeaderboard, getSingleUserOnLeaderboard, postLeaderboard, deleteSingleUserOnLeaderboard } from "./controllers/leaderboard.controllers.mjs";
const app = express();

app.use(express.json());

// Users
app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUser);

// Alphabet
app.get("/api/alphabet/", getAlphabet);
app.get("/api/alphabet/:alphabet_id", getCharacter);

// Leaderboard
app.get("/api/leaderboard", getLeaderboard);
app.get("/api/leaderboard/:user_id", getSingleUserOnLeaderboard);
app.post("/api/leaderboard", postLeaderboard);
app.delete("/api/leaderboard/:user_id", deleteSingleUserOnLeaderboard);

export default app;
