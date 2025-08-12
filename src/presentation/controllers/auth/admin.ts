import { AdminAuthUseCases } from "@/application/auth-user/admin/AdminAuthUseCases";
import { config } from "@/config";
import { grpcMetricsCollector } from "@/helper/grpcMetricsCollector";
import { GrpcAdminAuthService } from "@/infra/grpc/auth-user-service/admin/AdminAuthService";
import { setCookie } from "@/utility/set-cookie";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { ServiceError } from "@grpc/grpc-js";
import { Request, Response } from "express";
import ms from "ms";

const authUseCase = new AdminAuthUseCases(new GrpcAdminAuthService())

export const authController = {

  login : async (req: Request, res: Response): Promise<Response> => {
      const startTime = Date.now(); // for latency
      const method = 'admin_login'
    try {
      const grpcResponse = await authUseCase.login({
        email : req.body.email,
        password : req.body.password,
        role : 'ADMIN'
      });

        setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
        setCookie(res, "role","admin", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      grpcMetricsCollector(method,grpcResponse.message,startTime); 
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK, grpcResponse.userInfo);
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

  refreshToken : async (req: Request, res: Response): Promise<Response> => {
      const startTime = Date.now(); // for latency
      const method = 'admin_refresh_token'
    try {
        
      const { userId, email, role } = req ;
      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }
      const grpcResponse = await authUseCase.refreshToken({ userId, email, role });
      
      grpcMetricsCollector(method,grpcResponse.message,startTime); 

      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);

      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,{
        accessToken : grpcResponse.accessToken,
      });

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
          res.clearCookie("role", {
            httpOnly : true,
            secure : true,
            sameSite : "strict"
          })
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

}
