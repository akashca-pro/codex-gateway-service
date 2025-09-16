import express from 'express';
import { adminAuthRouter } from './auth/admin';
import { adminProfileRouter } from './profile/admin';
import { adminDashboardRouter } from './dashboard/admin';
import { adminProblemRouter } from './problems/admin';
import { verifyAccessToken } from '../middlewares/jwt';
import { adminMetricRouter } from './metrics/admin';
import { adminUserRouter } from './user-management/admin';

export const adminRouter = express.Router();

// Request metrics stats.
adminRouter.use(
    '/metrics',
    verifyAccessToken('admin'),
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
    verifyAccessToken('admin'),
    adminProfileRouter
);

// Problem CRUD routes.
adminRouter.use(
    '/problems',
    verifyAccessToken('admin'),
    adminProblemRouter
);

// Dashboard analytics routes.
adminRouter.use(
    '/dashboard',
    verifyAccessToken('admin'),
    adminDashboardRouter
);

// User management routes.
adminRouter.use(
  '/users',
  verifyAccessToken('admin'),
  adminUserRouter 
);