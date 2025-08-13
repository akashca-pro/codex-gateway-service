import express from 'express';
import { adminAuthRouter } from './auth/admin';
import { adminProfileRouter } from './profile/admin';
import { adminDashboardRouter } from './dashboard/admin';
import { adminProblemRouter } from './problems/admin';

export const adminRouter = express.Router();

adminRouter.use('/auth',adminAuthRouter);
adminRouter.use('/profile',adminProfileRouter);
adminRouter.use('/problem',adminProblemRouter);
adminRouter.use('/dashboard',adminDashboardRouter);