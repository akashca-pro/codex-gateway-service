import { Admin_Auth_Use_Cases } from "@/application/auth-user-service/admin/AdminAuthUseCases";
import { GrpcAdminAuthService } from "@/infrastructure/grpc/auth-user-service/admin/AdminAuthService";
import { setCookie } from "@/utility/set-cookie";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { ServiceError } from "@grpc/grpc-js";
import { Request, Response } from "express";

const authUseCase = new Admin_Auth_Use_Cases(new GrpcAdminAuthService())

export const authController = {

  login : async (req: Request, res: Response): Promise<Response> => {
    try {
      const grpcResponse = await authUseCase.login(req.body);

      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1000);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1000);
      setCookie(res, "role","admin", 7 * 24 * 60 * 60 * 1000);
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

  refreshToken : async (req: Request, res: Response): Promise<Response> => {
    try {
        
      const { userId, email, role } = req ;

      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }

      const grpcResponse = await authUseCase.refreshToken({ userId, email, role });

      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1000);
      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,{
        accessToken : grpcResponse.accessToken,
      });

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
}
