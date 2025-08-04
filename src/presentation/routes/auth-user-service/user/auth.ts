import express from 'express';
import { authController } from '@/presentation/controllers/auth-user-service/user/auth';
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';

import { validateRequestBody } from '@/presentation/middlewares/validateRequest';
import { resetPasswordSchema, forgotPasswordSchema, resendOtpSchema, signupSchema, userLoginSchema, verifyOtpSchema, userGoogleLoginSchema } from '@/infrastructure/validation/user.schema';
import { limiter } from '@/presentation/middlewares/rate-limiter';
import { upload } from '@/utility/multer';

const Router = express.Router();

Router.use(limiter);

Router.post('/signup', 
    validateRequestBody(signupSchema),
    authController.signup);

Router.post('/otp/resend-otp', 
    validateRequestBody(resendOtpSchema), 
    authController.resendOtp);

Router.post('/otp/verify-otp', 
    validateRequestBody(verifyOtpSchema), 
    authController.verifyOtp);

Router.post('/login', 
    validateRequestBody(userLoginSchema), 
    authController.login);

Router.post('/login/google-login',
    validateRequestBody(userGoogleLoginSchema), 
    authController.oAuthLogin);

Router.post('/password/forgot/request', 
    validateRequestBody(forgotPasswordSchema), 
    authController.forgotPassword);

Router.post('/password/change', 
    validateRequestBody(resetPasswordSchema), 
    authController.resetPassword);

Router.post('/refresh-token',
    verifyRefreshToken('user'),
    authController.refreshToken);

Router.delete('/logout',
    verifyAccessToken('user'),
    verifyRefreshToken('user'),
    authController.logout);

export default Router