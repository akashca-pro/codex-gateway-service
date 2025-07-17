import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";

import { AdminProfileUseCases } from "@/application/auth-user-service/admin/AdminProfileUseCases";
import { GrpcAdminProfileService } from "@/infrastructure/grpc/auth-user-service/admin/AdminProfileService";
import { TokenContext } from "@/types/TokenContext";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";


export class ProfileController {
    constructor(
        private profileUseCase = new AdminProfileUseCases(new GrpcAdminProfileService())
    ){}
  public async profile(req: Request, res: Response) {
    try {
      const { userId, email, role } = req;

      if (!userId || !email || !role) {
        return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
      }

      const metadata: TokenContext = { userId, email, role };
      const grpcResponse = await this.profileUseCase.profile(req.body, metadata);

      return ResponseHandler.success(res, 'Load Profile Success', HTTP_STATUS.OK, {...grpcResponse});
    } catch (error) {
      const grpcError = error as ServiceError;
      logger.error(grpcError.message);
      return ResponseHandler.error(res, "Internal server error", mapGrpcCodeToHttp(grpcError.code));
    }
  }
}
