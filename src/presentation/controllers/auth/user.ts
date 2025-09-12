import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/auth-user-service/UserServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { setCookie } from "@/util/set-cookie";
import redis from "@/config/redis";
import { config } from "@/config";
import ms from "ms";
import { verifyGoogleToken } from "@/util/googleVerifier";
import { uploadImageUrlToCloudinary } from "@/util/cloudinary/uploadImageToCloudinary";
import { REDIS_KEY_PREFIX } from "@/config/redis/keyPrefix";

export const authController = {

  signup: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const grpcResponse = await grpcClient.signup(req.validated?.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  },

  resendOtp: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const grpcResponse = await grpcClient.resendOtp(req.validated?.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  },

  verifyOtp: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const grpcResponse = await grpcClient.verifyOtp(req.validated?.body);

      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "role","user", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

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
        role : 'USER'
      });

      if(grpcResponse.accessToken && grpcResponse.refreshToken){

        setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, "role","user", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

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

      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "role","user", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

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

  resetPassword: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const grpcResponse = await grpcClient.resetPassword(req.validated?.body);

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

      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);

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
        
          res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });

          res.clearCookie("refreshToken", {
            httpOnly : true,
            secure : true,
            sameSite : "strict"
          })

          res.clearCookie("role",{
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
