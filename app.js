const express = require("express");
const app = express();
const { getUsers } = require("./controllers/users.controllers");

app.use(express.json());

app.get("/api/users", getUsers);

module.exports = app;
