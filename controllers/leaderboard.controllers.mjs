import { selectLeaderboard, selectSingleUserOnLeaderboard, insertLeaderboard, deleteLeaderboard, updateLeaderboard } from "../models/leaderboard.models.mjs";

export const getLeaderboard = (req, res) => {
  selectLeaderboard().then((users) => {
    res.status(200).send({ users });
  });
};

export const getSingleUserOnLeaderboard = (req, res) => {
  const { user_id } = req.params;
  selectSingleUserOnLeaderboard(user_id).then((user) => {
    res.status(200).send({ user });
  });
};

export const postLeaderboard = (req, res) => {
  insertLeaderboard(req.body).then((user) => {
    res.status(201).send({ user });
  });
};

export const deleteSingleUserOnLeaderboard = (req, res) => {
  const { user_id } = req.params;
  deleteLeaderboard(user_id).then(() => {
    res.status(204).send({ msg: "User deleted!" });
  });
};

export const updateScoreOnLeaderboard = (req, res) => {
  const { score } = req.body;
  const { user_id } = req.params;
  updateLeaderboard(score, user_id).then((user) => {
    res.status(200).send({ user });
  });
};
