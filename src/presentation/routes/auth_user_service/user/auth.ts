import express from 'express';
import { AuthController } from '@/presentation/controllers/auth-user-service/user/auth';
import { verifyRefreshToken } from '@/presentation/middlewares/jwt';

const Router = express.Router();

Router.post('/signup',AuthController.signup);
Router.post('otp/resend-otp',AuthController.resendOtp);
Router.post('otp/verify_otp',AuthController.verifyOtp);
Router.post('login',AuthController.login);
Router.post('login/google-login',AuthController.googleLogin);
Router.post('password/forgot/request',AuthController.forgotPassword);
Router.post('password/change',AuthController.changePassword);
Router.post('refresh-token',verifyRefreshToken,AuthController.refreshToken);


export default Router