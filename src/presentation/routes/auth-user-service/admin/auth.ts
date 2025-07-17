import express from 'express';
import { AuthController } from '@/presentation/controllers/auth-user-service/admin/auth'
import { verifyRefreshToken } from '@/presentation/middlewares/jwt';

const Router = express.Router();

const authController = new AuthController()

Router.post('/login',authController.login);
Router.post('/refresh-token',verifyRefreshToken,authController.refreshToken);


export default Router