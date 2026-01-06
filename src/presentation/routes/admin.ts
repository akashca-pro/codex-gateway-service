import express from 'express';
import { adminAuthRouter } from './auth/admin';
import { adminProfileRouter } from './profile/admin';
import { adminDashboardRouter } from './dashboard/admin';
import { adminProblemRouter } from './problems/admin';
import { verifyAccessToken } from '../middlewares/jwt';
import { adminMetricRouter } from './metrics/admin';
import { adminUserRouter } from './user-management/admin';
import { APP_LABELS } from '@/const/labels.const';
import { adminLeaderboardRouter } from './leaderboard/admin';
import { 
    metricsLimiter, 
    profileLimiter, 
    problemsLimiter, 
    dashboardLimiter, 
    leaderboardLimiter, 
    adminLimiter 
} from '../middlewares/rate-limiter';

export const adminRouter = express.Router();

// Request metrics stats.
adminRouter.use(
    '/metrics',
    metricsLimiter,
    verifyAccessToken(APP_LABELS.ADMIN),
    adminMetricRouter
);

// Auth routes (rate limiting handled in auth router).
adminRouter.use(
    '/auth',
    adminAuthRouter
);

// Profile routes.
adminRouter.use(
    '/profile',
    profileLimiter,
    verifyAccessToken(APP_LABELS.ADMIN),
    adminProfileRouter
);

// Problem CRUD routes.
adminRouter.use(
    '/problems',
    problemsLimiter,
    verifyAccessToken(APP_LABELS.ADMIN),
    adminProblemRouter
);

// Dashboard analytics routes.
adminRouter.use(
    '/dashboard',
    dashboardLimiter,
    verifyAccessToken(APP_LABELS.ADMIN),
    adminDashboardRouter
);

adminRouter.use(
    '/leaderboard',
    leaderboardLimiter,
    verifyAccessToken(APP_LABELS.ADMIN),
    adminLeaderboardRouter
)

// User management routes.
adminRouter.use(
    '/users',
    adminLimiter,
    verifyAccessToken(APP_LABELS.ADMIN),
    adminUserRouter 
);