import { APP_LABELS } from '@/const/labels.const';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { userDashboardSchema } from '@/validation/dashboard/dashboard.schema';
import express from 'express';
import { userDashboardController as controller } from '@/presentation/controllers/dashboard/user';

export const userDashboardRouter = express.Router()

userDashboardRouter.get(
    '/',
    validateRequest(userDashboardSchema, APP_LABELS.QUERY),
    controller.getDashboard
)