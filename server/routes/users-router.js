import express from "express";
import { getUsers, getUser } from "../controllers/users.controllers.js";
export const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:user_id", getUser);
