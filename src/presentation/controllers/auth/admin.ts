import { config } from "@/config";
import { GrpcAdminAuthService } from "@/infra/grpc/auth-user-service/admin/AdminAuthService";
import { setCookie } from "@/util/set-cookie";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { NextFunction, Request, Response } from "express";
import ms from "ms";

const grpcClient = new GrpcAdminAuthService();

export const authController = {

  login : async (req: Request, res: Response, next : NextFunction) => {
    try {

      const grpcResponse = await grpcClient.login({
      email : req.body.email,
      password : req.body.password,
      role : 'ADMIN'
      })
        
      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, "role","admin", config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK, grpcResponse.userInfo);
    } catch (error) {
      next(error);
    }
  },

  refreshToken : async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { userId, email, role } = req ;
      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }
      const grpcResponse = await grpcClient.refreshToken({ userId, email, role });
      setCookie(res, "accessToken", grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);

      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,{
        accessToken : grpcResponse.accessToken,
      });

    } catch (error) {
      next(error)
    }
  },

  logout : async(req : Request, res : Response, next : NextFunction) => {
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
        next(error);
      }
  },
}
