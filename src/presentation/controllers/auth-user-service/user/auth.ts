import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { UserAuthUseCases } from "@/application/auth-user-service/user/UserAuthUseCases";
import { GrpcUserAuthService } from "@/infrastructure/grpc/auth-user-service/user/UserAuthServices";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import { setCookie } from "@/utility/set-cookie";
import redis from "@/config/redis";
import { grpcMetricsCollector } from "@/helper/grpcMetricsCollector";
import { config } from "@/config";
import ms from "ms";
import { verifyGoogleToken } from "@/utility/googleVerifier";
import { uploadImageUrlToCloudinary } from "@/utility/cloudinary/uploadImageToCloudinary";

const authUseCase = new UserAuthUseCases(new GrpcUserAuthService());

export const authController = {

  signup: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_signup'

    try {
      const grpcResponse = await authUseCase.signup(req.body);
      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();

      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  resendOtp: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_resend_otp'

    try {
      const grpcResponse = await authUseCase.resendOtp(req.body);
      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_verify_otp'

    try {
      const grpcResponse = await authUseCase.verifyOtp(req.body);

      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "role","user", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);

      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  login: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_login'
      
    try {
      const grpcResponse = await authUseCase.login({
        email : req.body.email,
        password : req.body.password,
        role : 'USER'
      });

      if(grpcResponse.accessToken && grpcResponse.refreshToken){
        setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, "role","user", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

        grpcMetricsCollector(method,grpcResponse.message,startTime); 
        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
      }else{
        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.ACCEPTED,'Not-verified');
      }
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  oAuthLogin: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_o_auth_login'
    try {

      let avatarPublicId = null;

      const { email, name , imageUrl, sub } = await verifyGoogleToken(req.body.oAuthId);

      if(imageUrl){
        const result = await uploadImageUrlToCloudinary(imageUrl,name!.replace(/\s+/g, "_").toLowerCase());
        avatarPublicId = result.public_id;
      }
      
      const grpcResponse = await authUseCase.oAuthLogin({
        email : email!,
        firstName : name!,
        oAuthId : sub,
        avatar : avatarPublicId || ''
      });

      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "role","user", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  forgotPassword: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_forgot_password'
    try {
      const grpcResponse = await authUseCase.forgotPassword(req.body);

      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  resetPassword: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_reset_password'
    try {
      const grpcResponse = await authUseCase.resetPassword(req.body);

      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  refreshToken: async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_refresh_token'
    try {
      const { userId, email, role } = req;
      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }
      const grpcResponse = await authUseCase.refreshToken({ userId, email, role });

      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);

      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      grpcMetricsCollector(method,grpcError.message,startTime); 
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  logout : async(req : Request, res : Response) => {
      try {

          const now = Math.floor(Date.now() / 1000);
          const accessTokenTtl = (req.accessTokenExp as number) - now;
          const refreshTokenTtl = (req.refreshTokenExp as number) - now;

          await redis.set(`blacklistAccessToken:${req.accessTokenId}`, "1", "EX", accessTokenTtl);
          await redis.set(`blacklistRefreshToken:${req.refreshTokenId}`, "1", "EX" , refreshTokenTtl)
        
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
        return ResponseHandler.error(res,'Internal Server Error',HTTP_STATUS.INTERNAL_SERVER_ERROR);
      }
  },

};
