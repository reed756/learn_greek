const express = require("express");
const app = express();
const { getUsers, getUser } = require("./controllers/users.controllers");

app.use(express.json());

app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUser);

module.exports = app;
