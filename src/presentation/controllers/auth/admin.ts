import { config } from "@/config";
import { setCookie } from "@/util/set-cookie";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { NextFunction, Request, Response } from "express";
import grpcClient from '@/transport/grpc/auth-user-service/AdminServices'
import ms from "ms";
import { APP_LABELS } from "@/const/labels.const";

export const authController = {

  login : async (req: Request, res: Response, next : NextFunction) => {
    try {
      req.log.info('Admin login request recieved');
      const grpcResponse = await grpcClient.login({
      email : req.validated?.body.email,
      password : req.validated?.body.password,
      role : APP_LABELS.ADMIN_CAP
      })
      req.log.info('Admin login response recieved');
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY as ms.StringValue);
      return ResponseHandler.success(res, grpcResponse.message, HTTP_STATUS.OK, grpcResponse.userInfo);
    } catch (error) {
      req.log.error(error,'Admin login failed');
      next(error);
    }
  },

  refreshToken : async (req: Request, res: Response, next : NextFunction) => {
    try {
      req.log.info('Admin refreshToken request recieved');
      const { userId, email, role } = req ;
      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }
      const grpcResponse = await grpcClient.refreshToken({ userId, email, role });
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY as ms.StringValue);
      req.log.info('Admin refreshToken response recieved');
      return ResponseHandler.success(res, grpcResponse.message,HTTP_STATUS.OK,{
        accessToken : grpcResponse.accessToken,
      });
    } catch (error) {
      req.log.error(error,'Admin refreshToken request failed');
      next(error)
    }
  },

  logout : async(req : Request, res : Response, next : NextFunction) => {
      try {
          req.log.info('Admin logout request recieved');
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
        req.log.error('Admin logout request failed');
        next(error);
      }
  },
}
