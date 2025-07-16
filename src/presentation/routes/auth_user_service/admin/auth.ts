import express from 'express';
import { auth_controller } from '@/presentation/controllers/auth-user-service/admin/auth'
import { verifyRefreshToken } from '@/presentation/middlewares/jwt';

const Router = express.Router();

Router.post('/login',auth_controller.login);
Router.post('/refresh-token',verifyRefreshToken,auth_controller.refresh_token);


export default Router