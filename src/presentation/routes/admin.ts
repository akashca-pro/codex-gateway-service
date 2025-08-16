import express from 'express';
import { adminAuthRouter } from './auth/admin';
import { adminProfileRouter } from './profile/admin';
import { adminDashboardRouter } from './dashboard/admin';
import { adminProblemRouter } from './problems/admin';
import { verifyAccessToken } from '../middlewares/jwt';

export const adminRouter = express.Router();

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
    verifyAccessToken('admin'),
    adminProblemRouter
);

adminRouter.use('/dashboard',
    verifyAccessToken('admin'),
    adminDashboardRouter
);