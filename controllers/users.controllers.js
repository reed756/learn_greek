import { selectUsers, selectUser } from "../models/users.models.js";

export const getUsers = async (req, res) => {
  const users = await selectUsers();
  res.status(200).send({ users });
};

export const getUser = async (req, res) => {
  const { user_id } = req.params;
  const user = await selectUser(user_id);
  res.status(200).send({ user });
};
