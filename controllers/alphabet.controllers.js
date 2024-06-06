const { selectAlphabet, selectCharacter } = require("../models/alphabet.models.js");

exports.getAlphabet = (req, res) => {
  selectAlphabet().then((characters) => {
    res.status(200).send({ characters });
  });
};

exports.getCharacter = (req, res) => {
  const { alphabet_id } = req.params;
  selectCharacter(alphabet_id).then((character) => {
    res.status(200).send({ character });
  });
};
