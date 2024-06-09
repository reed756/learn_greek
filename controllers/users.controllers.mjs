import { selectUsers, selectUser } from "../models/users.models.mjs";

export const getUsers = (req, res) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

export const getUser = (req, res) => {
  const { user_id } = req.params;
  selectUser(user_id).then((user) => {
    res.status(200).send({ user });
  });
};
