import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { UserProfileUseCases } from "@/application/auth-user/user/UserProfileUseCases";
import { GrpcUserProfileService } from "@/infra/grpc/auth-user-service/user/UserProfileServices";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import { grpcMetricsCollector } from "@/helper/grpcMetricsCollector";

const userUseCase = new UserProfileUseCases(
  new GrpcUserProfileService()
);

export const profileController = {

  profile : async (req: Request, res: Response) => {
      const startTime = Date.now(); // for latency
      const method = 'user_profile'
    try {
      const { userId, email } = req;

      const grpcResponse = await userUseCase.profile({
        userId : (userId as string),
        email  : (email as string) });

      grpcMetricsCollector(method,'success',startTime); 

      return ResponseHandler.success(res, "Profile data loaded successfully", HTTP_STATUS.OK, {
        ...grpcResponse,
      });
    } catch (error) {
      const grpcError = error as ServiceError;

      logger.error(grpcError.message,error);
      grpcMetricsCollector(method,grpcError.message,startTime); 
      
      return ResponseHandler.error(
        res,
         grpcError.message || 'Internal Server Error',
          mapGrpcCodeToHttp(grpcError.code)
        );
    }
  },

  updateProfile : async (req : Request, res : Response) => {

      const startTime = Date.now(); // for latency
      const method = 'user_update_profile'

    try {
      
    } catch (error) {
      
    }

  }
}
