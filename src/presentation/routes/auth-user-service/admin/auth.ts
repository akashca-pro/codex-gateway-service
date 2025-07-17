import express from 'express';
import { authController } from '@/presentation/controllers/auth-user-service/admin/auth'
import { verifyRefreshToken } from '@/presentation/middlewares/jwt';

const Router = express.Router();

Router.post('/login',authController.login);
Router.post('/refresh-token',verifyRefreshToken('admin'),authController.refreshToken);


export default Router