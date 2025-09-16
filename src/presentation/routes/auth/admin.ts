import express from 'express';
import { authController } from '@/presentation/controllers/auth/admin'
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { adminLoginSchema } from '@/util/validation/auth/admin.schema';

export const adminAuthRouter = express.Router();

// Verify credentials and issue access and refresh token.
adminAuthRouter.post(
    '/login', 
    validateRequest(adminLoginSchema), 
    authController.login);

// Verify Refresh token and issue new access token.
adminAuthRouter.post(
    '/refresh-token',
    verifyRefreshToken('admin'),
    authController.refreshToken);

// Clear access and refresh token.
adminAuthRouter.delete(
    '/logout', 
    verifyAccessToken('admin'),
    authController.logout);


