const express = require("express");
const app = express();
const { getUsers, getUser } = require("./controllers/users.controllers");
const { getAlphabet, getCharacter } = require("./controllers/alphabet.controllers");

app.use(express.json());

// Users
app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUser);

// Alphabet
app.get("/api/alphabet/", getAlphabet);
app.get("/api/alphabet/:alphabet_id", getCharacter);

// Leaderboard

module.exports = app;
