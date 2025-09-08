import { NextFunction, Request, Response } from "express";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import grpcClient from '@/infra/grpc/auth-user-service/admin/AdminServices'

export const profileController = {

  profile : async (req: Request, res: Response,next : NextFunction) => {
    try {
      const { userId, email, role } = req;

      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }

      const grpcResponse = await grpcClient.profile({ userId, email });
      return ResponseHandler.success(res, 'Load Profile Success', HTTP_STATUS.OK, {...grpcResponse});
    } catch (error) {
      next(error);
    }
  }
}
