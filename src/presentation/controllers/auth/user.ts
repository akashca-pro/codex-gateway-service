import { NextFunction, Request, Response } from "express";
import grpcClient from '@/transport/grpc/auth-user-service/UserServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { setCookie, getCookieOptions } from "@/util/set-cookie";
import redis from "@/config/redis";
import { config } from "@/config";
import ms from "ms";
import { verifyGoogleToken } from "@/util/googleVerifier";
import { uploadImageUrlToCloudinary } from "@/util/cloudinary/uploadImageToCloudinary";
import { REDIS_KEY_PREFIX } from "@/config/redis/keyPrefix";
import { ResendOtpRequest, ResetPasswordRequest } from "@akashcapro/codex-shared-utils";
import { OTP_TYPE } from "@/const/auth-user/OtpType.const";
import { USER_SUCCESS_TYPES } from "@/const/auth-user/UserSuccessTypes.const";
import { APP_LABELS } from "@/const/labels.const";

export const authController = {

  signup: async (req: Request, res: Response, next : NextFunction) => {
    try {
      req.log.info('Signup request received');
      const grpcResponse = await grpcClient.signup(req.validated?.body);
      req.log.info({ email: req.validated?.body.email },'Signup gRPC response recieved'); // Log email for context
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email },'Signup failed'); // Log email for context
      next(error);
    }
  },

  resendSignupOtp: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email },'Resend signup OTP request received'); // Log email for context
      const grpcResponse = await grpcClient.resendOtp({
        email,
        otpType : OTP_TYPE.SIGNUP
      });
      req.log.info({ email },'Resend signup OTP gRPC response recieved'); // Log email for context
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, 'Resend signup OTP failed'); // Log email for context
      next(error);
    }
  },

  verifyOtp: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email },'Verify OTP request received'); // Log email for context
      const grpcResponse = await grpcClient.verifyOtp(req.validated?.body);
      req.log.info({ userId: grpcResponse.userInfo?.userId, email },'Verify OTP gRPC response recieved and cookies set'); // Log user ID
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, 'Verify OTP failed'); // Log email for context
      next(error);
    }
  },

  login: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email } = req.body;
      req.log.info({ email },'Login request received'); // Log email for context
      const grpcResponse = await grpcClient.login({
        email : req.body.email,
        password : req.body.password,
        role : APP_LABELS.USER_CAP
      });
      
      const userId = grpcResponse.userInfo?.userId;
      if(grpcResponse.accessToken && grpcResponse.refreshToken){
        req.log.info({ userId, email },'Login successful. Cookies set.');
        setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
        console.log(grpcResponse)
        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
      }else{
        req.log.warn({ email },'Login gRPC response recieved, user not verified/accepted status'); // Use WARN for accepted (not failure)
        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.ACCEPTED,'Not-verified');
      }
    } catch (error) {
      req.log.error({ error, email: req.body.email }, 'Login failed'); // Log email for context
      next(error);
    }
  },

  oAuthLogin: async (req: Request, res: Response, next : NextFunction) => {
    try {
      req.log.info('OAuth login request received. Verifying Google token...');
      let avatarPublicId = null;
      
      const { email, name , imageUrl, sub } = await verifyGoogleToken(req.validated?.body.oAuthId);
      req.log.info({ email, sub },'Google token verified. Checking avatar...'); // Log token verification success

      if(imageUrl){
        req.log.info({ email },'Uploading OAuth image to Cloudinary...');
        const result = await uploadImageUrlToCloudinary(imageUrl,name!.replace(/\s+/g, "_").toLowerCase());
        avatarPublicId = result.public_id;
        req.log.info({ email, avatarPublicId },'Cloudinary upload complete.');
      }

      req.log.info({ email, sub },'Calling OAuth login gRPC service...');
      const grpcResponse = await grpcClient.oAuthLogin({
        email : email!,
        firstName : name!,
        oAuthId : sub,
        avatar : avatarPublicId || ''
      });

      req.log.info({ userId: grpcResponse.userInfo?.userId, email },'OAuth login gRPC response recieved. Cookies set.');
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      console.log(grpcResponse);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      req.log.error({ error }, 'OAuth login failed');
      next(error)
    }
  },

  forgotPassword: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email },'Forgot password request received');
      const grpcResponse = await grpcClient.forgotPassword(req.validated?.body);
      req.log.info({ email },'Forgot password gRPC response recieved. OTP issued.');
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, 'Forgot password failed');
      next(error);
    }
  },

  resendForgotOtp : async (req : Request, res : Response, next : NextFunction) => {
    try {
      const { email } = req.validated?.body
      req.log.info({ email },'Resend forgot OTP request received');
      const dto : ResendOtpRequest = {
        email,
        otpType : OTP_TYPE.FORGOT_PASS 
      }
      await grpcClient.resendOtp(dto);
      req.log.info({ email },'Resend forgot OTP response recieved');
      return ResponseHandler.success(
        res,
        USER_SUCCESS_TYPES.NEW_OTP_ISSUED,
        HTTP_STATUS.OK
      )
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, 'Resend forgot OTP failed');
      next(error);
    }
  },

  resetPassword: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email },'Reset password request received');
      const { newPassword, otp } = req.validated?.body;
      const dto : ResetPasswordRequest = {
        email,
        newPassword,
        otp
      }
      const grpcResponse = await grpcClient.resetPassword(dto);
      req.log.info({ email },'Reset password gRPC response. Password changed.');
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, 'Reset password failed');
      next(error);
    }
  },

  refreshToken: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { userId, email, role, username } = req;
      req.log.info({ userId, email },'Refresh token request received');
      
      if (!userId || !email || !role || !username) {
        req.log.warn('Refresh token missing required context (userId/email/role)');
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }
      
      const grpcResponse = await grpcClient.refreshToken({ userId, email, role, username });
      req.log.info({ userId, email },'Refresh token gRPC response recieved. Access token re-issued.');
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      req.log.error({ error, userId: req.userId }, 'Refresh token failed');
      next(error);
    }
  },

  logout : async(req : Request, res : Response, next : NextFunction) => {
      try {
          const { userId } = req;
          req.log.info({ userId },'Logout request received');
          
          const now = Math.floor(Date.now() / 1000);
          const accessTokenTtl = (req.accessTokenExp as number) - now;
          const refreshTokenTtl = (req.refreshTokenExp as number) - now;

          req.log.info({ userId, accessTokenId: req.accessTokenId },'Blacklisting access token...');
          await redis.set(`${REDIS_KEY_PREFIX.BLACKLIST_ACCESS_TOKEN}${req.accessTokenId}`, "1", "EX", accessTokenTtl);
          
          req.log.info({ userId, refreshTokenId: req.refreshTokenId },'Blacklisting refresh token...');
          await redis.set(`${REDIS_KEY_PREFIX.BLACKLIST_REFRESH_TOKEN}${req.refreshTokenId}`, "1", "EX" , refreshTokenTtl)
          
          req.log.info({ userId },'Tokens blacklisted. Clearing cookies.');
          const cookieOptions = getCookieOptions();
          res.clearCookie(APP_LABELS.ACCESS_TOKEN, cookieOptions);
          res.clearCookie(APP_LABELS.REFRESH_TOKEN, cookieOptions);
          res.clearCookie(APP_LABELS.ROLE, cookieOptions);
          
          req.log.info({ userId },'Logout success');
          return ResponseHandler.success(res,'Logout Successfully',HTTP_STATUS.OK);
      } catch (error) {
        req.log.error({ error, userId: req.userId }, 'Logout failed');
        next(error);
      }
  },

};