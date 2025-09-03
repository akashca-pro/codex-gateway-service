import express from 'express';
import { adminAuthRouter } from './auth/admin';
import { adminProfileRouter } from './profile/admin';
import { adminDashboardRouter } from './dashboard/admin';
import { adminProblemRouter } from './problems/admin';
import { verifyAccessToken } from '../middlewares/jwt';
import { adminMetricRouter } from './metrics/admin';

export const adminRouter = express.Router();

adminRouter.use(
    '/metrics',
    // verifyAccessToken('admin'),
    adminMetricRouter
);

adminRouter.use(
    '/auth',
    adminAuthRouter
);

adminRouter.use(
    '/profile',
    verifyAccessToken('admin'),
    adminProfileRouter
);

adminRouter.use(
    '/problems',
    // verifyAccessToken('admin'),
    adminProblemRouter
);

adminRouter.use('/dashboard',
    verifyAccessToken('admin'),
    adminDashboardRouter
);