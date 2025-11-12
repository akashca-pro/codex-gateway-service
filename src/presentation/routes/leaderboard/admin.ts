import { APP_LABELS } from '@/const/labels.const';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import express from 'express';
import { countryLeaderboardSchema, globalLeaderboardSchema } from '@/validation/leaderboard/leaderboard.schema';
import { LeaderboardController as controller } from '@/presentation/controllers/leaderboard/user'

export const adminLeaderboardRouter = express.Router();

adminLeaderboardRouter.get(
    '/global',
    validateRequest(globalLeaderboardSchema, APP_LABELS.QUERY),
    controller.getTopKGlobal
);

adminLeaderboardRouter.get(
    '/country',
    validateRequest(countryLeaderboardSchema, APP_LABELS.QUERY),
    controller.getTopKCountry
)