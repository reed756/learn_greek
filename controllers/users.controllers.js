const { selectUsers, selectUser } = require("../models/users.models.js");

exports.getUsers = (req, res) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUser = (req, res) => {
  const { user_id } = req.params;
  selectUser(user_id).then((user) => {
    res.status(200).send({ user });
  });
};
