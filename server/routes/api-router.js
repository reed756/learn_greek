import express from "express";
import { usersRouter } from "./users-router.js";
import { alphabetRouter } from "./alphabet-router.js";
import { leaderboardRouter } from "./leaderboard-router.js";
export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send("All OK from API Router");
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/alphabet", alphabetRouter);
apiRouter.use("/leaderboard", leaderboardRouter);
