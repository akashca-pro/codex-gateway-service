import express from 'express';
import { authController } from '@/presentation/controllers/auth/user';
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';

import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { resetPasswordSchema, forgotPasswordSchema, resendOtpSchema, signupSchema, userLoginSchema, verifyOtpSchema, userGoogleLoginSchema } from '@/util/validation/auth/user.schema';
import { limiter } from '@/presentation/middlewares/rate-limiter';

export const userAuthRouter = express.Router();

userAuthRouter.use(limiter);

userAuthRouter.post('/signup', 
    validateRequest(signupSchema),
    authController.signup);

userAuthRouter.post('/otp/resend-otp', 
    validateRequest(resendOtpSchema), 
    authController.resendOtp);

userAuthRouter.post('/otp/verify-otp', 
    validateRequest(verifyOtpSchema), 
    authController.verifyOtp);

userAuthRouter.post('/login', 
    validateRequest(userLoginSchema), 
    authController.login);

userAuthRouter.post('/login/google-login',
    validateRequest(userGoogleLoginSchema), 
    authController.oAuthLogin);

userAuthRouter.post('/password/forgot/request', 
    validateRequest(forgotPasswordSchema), 
    authController.forgotPassword);

userAuthRouter.post('/password/change', 
    validateRequest(resetPasswordSchema), 
    authController.resetPassword);

userAuthRouter.post('/refresh-token',
    verifyRefreshToken('user'),
    authController.refreshToken);

userAuthRouter.delete('/logout',
    verifyAccessToken('user'),
    verifyRefreshToken('user'),
    authController.logout);
