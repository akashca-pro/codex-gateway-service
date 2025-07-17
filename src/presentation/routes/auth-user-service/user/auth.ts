import express from 'express';
import { authController } from '@/presentation/controllers/auth-user-service/user/auth';
import { verifyRefreshToken } from '@/presentation/middlewares/jwt';

import { validateRequestBody } from '@/presentation/middlewares/validateRequest';
import { signupSchema } from '@/infrastructure/validation/user.schema';

const Router = express.Router();



Router.post('/signup', validateRequestBody(signupSchema), authController.signup);
Router.post('/otp/resend-otp',authController.resendOtp);
Router.post('/otp/verify-otp',authController.verifyOtp);
Router.post('/login',authController.login);
Router.post('/login/google-login',authController.googleLogin);
Router.post('/password/forgot/request',authController.forgotPassword);
Router.post('/password/change',authController.changePassword);
Router.post('/refresh-token',verifyRefreshToken('user'),authController.refreshToken);


export default Router