const express = require("express");
const app = express();
const { getUsers, getUser } = require("./controllers/users.controllers");
const { getAlphabet, getCharacter } = require("./controllers/alphabet.controllers");
const { getLeaderboard, getSingleUserOnLeaderboard, postLeaderboard } = require("./controllers/leaderboard.controllers");

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

module.exports = app;
