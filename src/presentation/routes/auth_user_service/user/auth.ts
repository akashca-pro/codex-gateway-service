import express from 'express';
import { auth_controller } from '@/presentation/controllers/auth_user_service/user/auth';
import { verify_refresh_token } from '@/presentation/middlewares/jwt';

const Router = express.Router();

Router.post('signup',auth_controller.signup);
Router.post('otp/resend-otp',auth_controller.resend_otp);
Router.post('otp/verify_otp',auth_controller.verify_otp);
Router.post('login',auth_controller.login);
Router.post('login/google-login',auth_controller.google_login);
Router.post('password/forgot/request',auth_controller.forgot_password);
Router.post('password/change',auth_controller.change_password);
Router.post('refresh-token',verify_refresh_token,auth_controller.refresh_token);


export default Router