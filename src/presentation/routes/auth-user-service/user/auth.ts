import express from 'express';
import { authController } from '@/presentation/controllers/auth-user-service/user/auth';
import { verifyRefreshToken } from '@/presentation/middlewares/jwt';

const Router = express.Router();


Router.post('/signup',authController.signup);
Router.post('/otp/resend-otp',authController.resendOtp);
Router.post('/otp/verify-otp',authController.verifyOtp);
Router.post('/login',authController.login);
Router.post('/login/google-login',authController.googleLogin);
Router.post('/password/forgot/request',authController.forgotPassword);
Router.post('/password/change',authController.changePassword);
Router.post('/refresh-token',verifyRefreshToken('user'),authController.refreshToken);


export default Router