import express from 'express';
import { userAuthRouter } from './auth/user';
import { userProfileRouter } from './profile/user';
import { verifyAccessToken } from '../middlewares/jwt';
import { userProblemRouter } from './problems/user';
import { APP_LABELS } from '@/const/labels.const';
import { userCollabRouter } from './collab/user';
import { userLeaderboardRouter } from './leaderboard/user';
import { userDashboardRouter } from './dashboard/user';
import { 
    profileLimiter, 
    problemsLimiter, 
    collabLimiter, 
    leaderboardLimiter, 
    dashboardLimiter 
} from '../middlewares/rate-limiter';


export const userRouter = express.Router();

// Auth routes (rate limiting handled in auth router)
userRouter.use(
    '/auth', 
    userAuthRouter
);

// Profile routes
userRouter.use(
    '/profile', 
    profileLimiter,
    verifyAccessToken(APP_LABELS.USER), 
    userProfileRouter
);

// Problem routes
userRouter.use(
    '/problems',
    problemsLimiter,
    verifyAccessToken(APP_LABELS.USER),
    userProblemRouter
)

// collab routes
userRouter.use(
    '/collab',
    collabLimiter,
    verifyAccessToken(APP_LABELS.USER),
    userCollabRouter
)

// leaderboard routes
userRouter.use(
    '/leaderboard',
    leaderboardLimiter,
    verifyAccessToken(APP_LABELS.USER),
    userLeaderboardRouter
)

// dashboard routes
userRouter.use(
    '/dashboard',
    dashboardLimiter,
    verifyAccessToken(APP_LABELS.USER),
    userDashboardRouter
)