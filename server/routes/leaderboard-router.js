import express from 'express'
import {
    deleteSingleUserOnLeaderboard,
    getLeaderboard,
    getSingleUserOnLeaderboard,
    postLeaderboard,
    updateScoreOnLeaderboard,
} from '../controllers/leaderboard.controllers.js'
export const leaderboardRouter = express.Router()

leaderboardRouter.route('/').get(getLeaderboard).post(postLeaderboard)

leaderboardRouter
    .route('/:user_id')
    .get(getSingleUserOnLeaderboard)
    .delete(deleteSingleUserOnLeaderboard)
    .patch(updateScoreOnLeaderboard)
