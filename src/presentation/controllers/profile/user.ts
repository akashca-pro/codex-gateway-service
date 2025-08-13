import { NextFunction, Request, Response } from "express";
import { GrpcUserProfileService } from "@/infra/grpc/auth-user-service/user/UserProfileServices";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

const grpcClient = new GrpcUserProfileService();

export const profileController = { 

  profile : async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { userId, email } = req;

      const grpcResponse = await grpcClient.profile({
        userId : (userId as string),
        email  : (email as string) });

      return ResponseHandler.success(res, "Profile data loaded successfully", HTTP_STATUS.OK, {
        ...grpcResponse,
      });
    } catch (error) {
      next(error);
    }
  },

}
