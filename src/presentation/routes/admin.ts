import express from 'express';
import { adminAuthRouter } from './auth/admin';
import { adminProfileRouter } from './profile/admin';
import { adminDashboardRouter } from './dashboard/admin';
import { adminProblemRouter } from './problems/admin';
import { verifyAccessToken } from '../middlewares/jwt';
import { adminMetricRouter } from './metrics/admin';
import { adminUserRouter } from './user-management/admin';
import { APP_LABELS } from '@/const/labels.const';

export const adminRouter = express.Router();

// Request metrics stats.
adminRouter.use(
    '/metrics',
    verifyAccessToken(APP_LABELS.ADMIN),
    adminMetricRouter
);

// Auth routes.
adminRouter.use(
    '/auth',
    adminAuthRouter
);

// Profile routes.
adminRouter.use(
    '/profile',
    verifyAccessToken(APP_LABELS.ADMIN),
    adminProfileRouter
);

// Problem CRUD routes.
adminRouter.use(
    '/problems',
    verifyAccessToken(APP_LABELS.ADMIN),
    adminProblemRouter
);

// Dashboard analytics routes.
adminRouter.use(
    '/dashboard',
    verifyAccessToken(APP_LABELS.ADMIN),
    adminDashboardRouter
);

// User management routes.
adminRouter.use(
  '/users',
  verifyAccessToken(APP_LABELS.ADMIN),
  adminUserRouter 
);