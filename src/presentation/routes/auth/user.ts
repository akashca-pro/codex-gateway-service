import express from 'express';
import { authController } from '@/presentation/controllers/auth/user';
import { verifyAccessToken, verifyRefreshToken } from '@/presentation/middlewares/jwt';

import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { resetPasswordSchema, forgotPasswordSchema, resendOtpSchema, signupSchema, userLoginSchema, verifyOtpSchema, userGoogleLoginSchema } from '@/validation/auth/user.schema';
import { limiter } from '@/presentation/middlewares/rate-limiter';
import { emailSchema } from '@/validation/profile/user';
import { APP_LABELS } from '@/const/labels.const';

export const userAuthRouter = express.Router();

userAuthRouter.use(limiter);

// Register a new user and send otp for sign up verification.
userAuthRouter.post(
    '/signup', 
    validateRequest(signupSchema),
    authController.signup
);

// Resend otp for sign up verification.
userAuthRouter.post(
    '/otp/resend-otp', 
    validateRequest(resendOtpSchema), 
    authController.resendSignupOtp
);

// Verify otp for signup.
userAuthRouter.post(
    '/otp/verify-otp', 
    validateRequest(verifyOtpSchema), 
    authController.verifyOtp
);

// Verify credentials and issue access and refresh token
userAuthRouter.post(
    '/login', 
    validateRequest(userLoginSchema), 
    authController.login
);

// Verify google token and signup/login user.
userAuthRouter.post(
    '/login/google-login',
    validateRequest(userGoogleLoginSchema), 
    authController.oAuthLogin
);

// Send otp to email for reset password
userAuthRouter.post(
    '/password/forgot/request', 
    validateRequest(forgotPasswordSchema), 
    authController.forgotPassword
);

// Resend otp for reset password.
userAuthRouter.post(
    '/password/forgot/request/resend-otp',
    validateRequest(emailSchema),
    authController.resendForgotOtp
)

// Verify otp and change password.
userAuthRouter.post(
    '/password/forgot/change', 
    validateRequest(resetPasswordSchema), 
    authController.resetPassword
);

// Issue a new access token based on valid refresh token
userAuthRouter.post(
    '/refresh-token',
    verifyRefreshToken(APP_LABELS.USER),
    authController.refreshToken
);

// Logout the user.
userAuthRouter.delete(
    '/logout',
    verifyAccessToken(APP_LABELS.USER),
    verifyRefreshToken(APP_LABELS.USER),
    authController.logout
);
