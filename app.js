const express = require("express");
const app = express();
const { getUsers, getUser } = require("./controllers/users.controllers");
const { getAlphabet, getCharacter } = require("./controllers/alphabet.controllers");

app.use(express.json());

app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUser);
app.get("/api/alphabet/", getAlphabet);
app.get("/api/alphabet/:alphabet_id", getCharacter);

module.exports = app;
