const { selectUsers } = require("../models/users.models.js");

exports.getUsers = (req, res) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};
