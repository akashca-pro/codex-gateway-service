import express from 'express';
import { authController } from '@/presentation/controllers/auth-user-service/admin/auth'
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';
import { validateRequestBody } from '@/presentation/middlewares/validateRequest';
import { adminLoginSchema } from '@/infrastructure/validation/admin.schema';

const Router = express.Router();

Router.post('/login', validateRequestBody(adminLoginSchema), authController.login);
Router.post('/refresh-token',verifyRefreshToken('admin'),authController.refreshToken);
Router.delete('/logout', verifyAccessToken('admin'),authController.logout);


export default Router