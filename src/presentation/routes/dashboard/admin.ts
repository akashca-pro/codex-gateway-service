import express from 'express';
import { adminDashboardController as controller } from '@/presentation/controllers/dashboard/admin';


export const adminDashboardRouter = express.Router()

adminDashboardRouter.get(
    '/',
    controller.getDashboard
)