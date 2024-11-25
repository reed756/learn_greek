import { selectLeaderboard, selectSingleUserOnLeaderboard, insertLeaderboard, deleteLeaderboard, updateLeaderboard } from "../models/leaderboard.models.js";

export const getLeaderboard = async (req, res) => {
  const users = await selectLeaderboard();
  res.status(200).send({ users });
};

export const getSingleUserOnLeaderboard = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await selectSingleUserOnLeaderboard(user_id);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

export const postLeaderboard = async (req, res, next) => {
  try {
    const user = await insertLeaderboard(req.body);
    res.status(201).send({ user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deleteSingleUserOnLeaderboard = async (req, res) => {
  const { user_id } = req.params;
  const user = await deleteLeaderboard(user_id);
  res.status(204).send({ user });
};

export const updateScoreOnLeaderboard = async (req, res) => {
  const { score } = req.body;
  const { user_id } = req.params;
  const user = await updateLeaderboard(score, user_id);
  res.status(200).send({ user });
};
