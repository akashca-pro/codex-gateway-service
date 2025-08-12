import express from 'express';
import { adminAuthRouter } from './auth/admin';
import { adminProfileRouter } from './profile/admin';
import { adminDashboardRouter } from './dashboard/admin';

export const adminRouter = express.Router();

adminRouter.use('/auth',adminAuthRouter);
adminRouter.use('/profile',adminProfileRouter);
adminRouter.use('/dashboard',adminDashboardRouter);