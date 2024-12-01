import express from "express";
import { getAlphabet, getCharacter } from "../controllers/alphabet.controllers";
export const alphabetRouter = express.Router();

alphabetRouter.get("/", getAlphabet);

alphabetRouter.get("/:alphabet_id", getCharacter);
