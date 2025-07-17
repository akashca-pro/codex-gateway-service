import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { UserProfileUseCases } from "@/application/auth-user-service/user/UserProfileUseCases";
import { GrpcUserProfileService } from "@/infrastructure/grpc/auth-user-service/user/UserProfileServices";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";

const userUseCase = new UserProfileUseCases(
  new GrpcUserProfileService()
);

export const profileController = {

  profile : async (req: Request, res: Response) => {
    try {
      console.log(req);
      const { userId, email, role } = req;

      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }

      const grpcResponse = await userUseCase.profile({userId , email});

      return ResponseHandler.success(res, "Profile data loaded successfully", HTTP_STATUS.OK, {
        ...grpcResponse,
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
