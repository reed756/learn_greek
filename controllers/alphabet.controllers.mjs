import { selectAlphabet, selectCharacter } from "../models/alphabet.models.mjs";

export const getAlphabet = (req, res) => {
  selectAlphabet().then((characters) => {
    res.status(200).send({ characters });
  });
};

export const getCharacter = (req, res) => {
  const { alphabet_id } = req.params;
  selectCharacter(alphabet_id).then((character) => {
    res.status(200).send({ character });
  });
};
