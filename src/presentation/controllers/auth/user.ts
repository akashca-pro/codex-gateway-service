import { NextFunction, Request, Response } from "express";
import grpcClient from '@/transport/grpc/auth-user-service/UserServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { setCookie } from "@/util/set-cookie";
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
      const grpcResponse = await grpcClient.signup(req.validated?.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  },

  resendSignupOtp: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email } = req.validated?.body;
      const grpcResponse = await grpcClient.resendOtp({
        email,
        otpType : OTP_TYPE.SIGNUP
      });
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  },

  verifyOtp: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const grpcResponse = await grpcClient.verifyOtp(req.validated?.body);

      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const grpcResponse = await grpcClient.login({
        email : req.body.email,
        password : req.body.password,
        role : APP_LABELS.USER_CAP
      });

      if(grpcResponse.accessToken && grpcResponse.refreshToken){

        setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
      }else{
        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.ACCEPTED,'Not-verified');
      }
    } catch (error) {
      next(error);
    }
  },

  oAuthLogin: async (req: Request, res: Response, next : NextFunction) => {
    try {

      let avatarPublicId = null;

      const { email, name , imageUrl, sub } = await verifyGoogleToken(req.validated?.body.oAuthId);

      if(imageUrl){
        const result = await uploadImageUrlToCloudinary(imageUrl,name!.replace(/\s+/g, "_").toLowerCase());
        avatarPublicId = result.public_id;
      }
      
      const grpcResponse = await grpcClient.oAuthLogin({
        email : email!,
        firstName : name!,
        oAuthId : sub,
        avatar : avatarPublicId || ''
      });

      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      next(error)
    }
  },

  forgotPassword: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const grpcResponse = await grpcClient.forgotPassword(req.validated?.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  },

  resendForgotOtp : async (req : Request, res : Response, next : NextFunction) => {
    try {
      const { email } = req.validated?.body
      const dto : ResendOtpRequest = {
        email,
        otpType : OTP_TYPE.FORGOT_PASS 
      }
      await grpcClient.resendOtp(dto);
      return ResponseHandler.success(
        res,
        USER_SUCCESS_TYPES.NEW_OTP_ISSUED,
        HTTP_STATUS.OK
      )
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email, newPassword, otp } = req.validated?.body;
      const dto : ResetPasswordRequest = {
        email,
        newPassword,
        otp
      }
      const grpcResponse = await grpcClient.resetPassword(dto);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { userId, email, role } = req;
      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }
      const grpcResponse = await grpcClient.refreshToken({ userId, email, role });

      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);

      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      next(error);
    }
  },

  logout : async(req : Request, res : Response, next : NextFunction) => {
      try {

          const now = Math.floor(Date.now() / 1000);
          const accessTokenTtl = (req.accessTokenExp as number) - now;
          const refreshTokenTtl = (req.refreshTokenExp as number) - now;

          await redis.set(`${REDIS_KEY_PREFIX.BLACKLIST_ACCESS_TOKEN}${req.accessTokenId}`, "1", "EX", accessTokenTtl);
          await redis.set(`${REDIS_KEY_PREFIX.BLACKLIST_REFRESH_TOKEN}${req.refreshTokenId}`, "1", "EX" , refreshTokenTtl)
        
          res.clearCookie(APP_LABELS.ACCESS_TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });

          res.clearCookie(APP_LABELS.REFRESH_TOKEN, {
            httpOnly : true,
            secure : true,
            sameSite : "strict"
          })

          res.clearCookie(APP_LABELS.ROLE,{
            httpOnly : true,
            secure : true,
            sameSite : "strict"
          })

          return ResponseHandler.success(res,'Logout Successfully',HTTP_STATUS.OK);
      } catch (error) {
        next(error);
      }
  },

};
