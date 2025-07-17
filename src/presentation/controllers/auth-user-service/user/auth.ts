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
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
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
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.verifyOtp(req.body);
      setCookie(res, "accessToken", grpcResponse.accessToken, 24 * 60 * 60 * 1000);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1000);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.login(req.body);
      if(grpcResponse.accessToken && grpcResponse.refreshToken){
        setCookie(res, "accessToken", grpcResponse.accessToken, 24 * 60 * 60 * 1000);
        setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1000);
      }
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  googleLogin: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.googleLogin(req.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
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
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  changePassword: async (req: Request, res: Response) => {
    try {
      const grpcResponse = await authUseCase.changePassword(req.body);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
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
      setCookie(res, "accessToken", grpcResponse.accessToken, 24 * 60 * 60 * 1000);
      return ResponseHandler.success(res, grpcResponse.message);
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  }
};
