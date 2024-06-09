const { selectLeaderboard, selectSingleUserOnLeaderboard, insertLeaderboard } = require("../models/leaderboard.models");

exports.getLeaderboard = (req, res) => {
  selectLeaderboard().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getSingleUserOnLeaderboard = (req, res) => {
  const { user_id } = req.params;
  selectSingleUserOnLeaderboard(user_id).then((user) => {
    res.status(200).send({ user });
  });
};

exports.postLeaderboard = (req, res) => {
  insertLeaderboard(req.body).then((user) => {
    res.status(201).send({ user });
  });
};
