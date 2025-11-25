import express from 'express';
import { userAuthRouter } from './auth/user';
import { userProfileRouter } from './profile/user';
import { verifyAccessToken } from '../middlewares/jwt';
import { userProblemRouter } from './problems/user';
import { APP_LABELS } from '@/const/labels.const';
import { userCollabRouter } from './collab/user';
import { userLeaderboardRouter } from './leaderboard/user';
import { userDashboardRouter } from './dashboard/user';


export const userRouter = express.Router();

// Auth routes
userRouter.use(
    '/auth', 
    userAuthRouter
);

// Profile routes
userRouter.use(
    '/profile', 
    verifyAccessToken(APP_LABELS.USER), 
    userProfileRouter
);

// Problem routes
userRouter.use(
    '/problems',
    // verifyAccessToken(APP_LABELS.USER),
    userProblemRouter
)

// collab routes
userRouter.use(
    '/collab',
    verifyAccessToken(APP_LABELS.USER),
    userCollabRouter
)

// leaderboard routes
userRouter.use(
    '/leaderboard',
    verifyAccessToken(APP_LABELS.USER),
    userLeaderboardRouter
)

// dashboard routes
userRouter.use(
    '/dashboard',
    verifyAccessToken(APP_LABELS.USER),
    userDashboardRouter
)