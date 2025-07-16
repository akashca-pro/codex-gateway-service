import express from 'express';
import { auth_controller } from '@/presentation/controllers/auth_user_service/admin/auth'
import { verify_refresh_token } from '@/presentation/middlewares/jwt';

const Router = express.Router();

Router.post('login',auth_controller.login);
Router.post('refresh-token',verify_refresh_token,auth_controller.refresh_token);


export default Router