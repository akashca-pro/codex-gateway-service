import express from 'express';
import { authController } from '@/presentation/controllers/auth/user';
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';

import { validateRequestBody } from '@/presentation/middlewares/validateRequest';
import { resetPasswordSchema, forgotPasswordSchema, resendOtpSchema, signupSchema, userLoginSchema, verifyOtpSchema, userGoogleLoginSchema } from '@/infra/validation/user.schema';
import { limiter } from '@/presentation/middlewares/rate-limiter';

export const userAuthRouter = express.Router();

userAuthRouter.use(limiter);

userAuthRouter.post('/signup', 
    validateRequestBody(signupSchema),
    authController.signup);

userAuthRouter.post('/otp/resend-otp', 
    validateRequestBody(resendOtpSchema), 
    authController.resendOtp);

userAuthRouter.post('/otp/verify-otp', 
    validateRequestBody(verifyOtpSchema), 
    authController.verifyOtp);

userAuthRouter.post('/login', 
    validateRequestBody(userLoginSchema), 
    authController.login);

userAuthRouter.post('/login/google-login',
    validateRequestBody(userGoogleLoginSchema), 
    authController.oAuthLogin);

userAuthRouter.post('/password/forgot/request', 
    validateRequestBody(forgotPasswordSchema), 
    authController.forgotPassword);

userAuthRouter.post('/password/change', 
    validateRequestBody(resetPasswordSchema), 
    authController.resetPassword);

userAuthRouter.post('/refresh-token',
    verifyRefreshToken('user'),
    authController.refreshToken);

userAuthRouter.delete('/logout',
    verifyAccessToken('user'),
    verifyRefreshToken('user'),
    authController.logout);
