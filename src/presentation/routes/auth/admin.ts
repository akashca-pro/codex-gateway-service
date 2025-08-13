import express from 'express';
import { authController } from '@/presentation/controllers/auth/admin'
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';
import { validateRequestBody } from '@/presentation/middlewares/validateRequest';
import { adminLoginSchema } from '@/util/validation/auth/admin.schema';

export const adminAuthRouter = express.Router();

adminAuthRouter.post(
    '/login', 
    validateRequestBody(adminLoginSchema), 
    authController.login);

adminAuthRouter.post(
    '/refresh-token',
    verifyRefreshToken('admin'),
    authController.refreshToken);

adminAuthRouter.delete(
    '/logout', 
    verifyAccessToken('admin'),
    authController.logout);


