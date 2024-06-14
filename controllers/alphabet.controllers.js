import { selectAlphabet, selectCharacter } from "../models/alphabet.models.js";

export const getAlphabet = async (req, res) => {
  const characters = await selectAlphabet();
  res.status(200).send({ characters });
};

export const getCharacter = async (req, res) => {
  const { alphabet_id } = req.params;
  const character = await selectCharacter(alphabet_id);
  res.status(200).send({ character });
};
