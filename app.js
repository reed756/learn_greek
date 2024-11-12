import express from "express";
import { getUsers, getUser } from "./controllers/users.controllers.js";
import { getAlphabet, getCharacter } from "./controllers/alphabet.controllers.js";
import { getLeaderboard, updateScoreOnLeaderboard, getSingleUserOnLeaderboard, postLeaderboard, deleteSingleUserOnLeaderboard } from "./controllers/leaderboard.controllers.js";
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
app.patch("/api/leaderboard/:user_id", updateScoreOnLeaderboard);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

export default app;
