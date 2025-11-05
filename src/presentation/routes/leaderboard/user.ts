import { APP_LABELS } from '@/const/labels.const';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { countryLeaderboardSchema, globalLeaderboardSchema } from '@/validation/leaderboard/leaderboard.schema';
import express from 'express';
import { LeaderboardController as controller } from '@/presentation/controllers/leaderboard/user'

export const userLeaderboardRouter = express.Router();


// List topKGlobal users with country name and solved problems count.
userLeaderboardRouter.get(
    '/global',
    validateRequest(globalLeaderboardSchema, APP_LABELS.QUERY),
    controller.getTopKGlobal
);

// List topKCountry users with country name and solved problems count.
userLeaderboardRouter.get(
    '/country',
    validateRequest(countryLeaderboardSchema, APP_LABELS.QUERY),
    controller.getTopKCountry
)
