import express from 'express';
import { authController } from '@/presentation/controllers/auth/admin'
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { adminLoginSchema } from '@/validation/auth/admin.schema';
import { APP_LABELS } from '@/const/labels.const';

export const adminAuthRouter = express.Router();

// Verify credentials and issue access and refresh token.
adminAuthRouter.post(
    '/login', 
    validateRequest(adminLoginSchema), 
    authController.login);

// Verify Refresh token and issue new access token.
adminAuthRouter.post(
    '/refresh-token',
    verifyRefreshToken(APP_LABELS.ADMIN),
    authController.refreshToken);

// Clear access and refresh token.
adminAuthRouter.delete(
    '/logout', 
    verifyAccessToken(APP_LABELS.ADMIN),
    authController.logout);


