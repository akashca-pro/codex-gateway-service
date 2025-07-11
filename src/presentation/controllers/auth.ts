import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { Auth_Use_Cases } from "../../application/auth_use_cases";
import { Grpc_Auth_Service } from "../../infrastructure/grpc/auth_services";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";

const authUseCase = new Auth_Use_Cases(new Grpc_Auth_Service);

export const auth_controller = {
    
    signup : async (req : Request, res : Response) => {

        try {
            const grpc_response = await authUseCase.signup(req.body);
            return ResponseHandler.success(res, grpc_response.message , HTTP_STATUS.OK);
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    resend_otp : async (req : Request, res : Response) => {

        try {
            const grpc_response = await authUseCase.resend_otp(req.body);
            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

}