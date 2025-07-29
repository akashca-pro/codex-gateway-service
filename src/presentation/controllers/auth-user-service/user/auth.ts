import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { UserAuthUseCases } from "@/application/auth-user-service/user/UserAuthUseCases";
import { GrpcUserAuthService } from "@/infrastructure/grpc/auth-user-service/user/UserAuthServices";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import { setCookie } from "@/utility/set-cookie";

const authUseCase = new UserAuthUseCases(new GrpcUserAuthService());

export const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.signup(req.body);
      console.log(grpcResponse)
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  resendOtp: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.resendOtp(req.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.verifyOtp(req.body);
      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1000);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1000);
      setCookie(res, "role","user", 7 * 24 * 60 * 60 * 1000);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.login(req.body);
      if(grpcResponse.accessToken && grpcResponse.refreshToken){
        setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1000);
        setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1000);
        setCookie(res, "role","user", 7 * 24 * 60 * 60 * 1000);
        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
      }else{
        return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.ACCEPTED,'not-verified');
      }
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  oAuthLogin: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.oAuthLogin(req.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  forgotPassword: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.forgotPassword(req.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.resetPassword(req.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const { userId, email, role } = req;
      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }
      const grpcResponse = await authUseCase.refreshToken({ userId, email, role });
      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1000);
      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return ResponseHandler.error(
        res,
         errorMessage || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  logout : async(req : Request, res : Response) => {
      try {
          res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          return ResponseHandler.success(res,'Logout Successfully',HTTP_STATUS.OK);
      } catch (error) {
        return ResponseHandler.error(res,'Internal Server Error',HTTP_STATUS.INTERNAL_SERVER_ERROR);
      }
  },

  checkAuth : async (req : Request, res : Response) => {
      try {
        return ResponseHandler.success(res,'Authenticated',HTTP_STATUS.OK,{
          userId : req.userId,
          email : req.email,
          role : req.role
        });
      } catch (error) {
        return ResponseHandler.error(res,'Internal Server Error',HTTP_STATUS.INTERNAL_SERVER_ERROR);
      }
  }

};
