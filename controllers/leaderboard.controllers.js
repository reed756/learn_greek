exports.getLeaderboard = (req, res) => {
  selectLeaderboard().then((users) => {
    res.status(200).send({ users });
  });
};
