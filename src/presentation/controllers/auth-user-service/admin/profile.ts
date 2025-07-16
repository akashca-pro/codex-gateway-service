import { Admin_Profile_Use_Cases } from "@/application/auth-user-service/admin/AdminProfileUseCases";
import { Grpc_Admin_Profile_Service } from "@/infrastructure/grpc/auth-user-service/admin/AdminProfileService";
import { Token_Context } from "@/types/TokenContext";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { ServiceError } from "@grpc/grpc-js";
import { Request, Response } from "express";


const profile_use_case = new Admin_Profile_Use_Cases(
    new Grpc_Admin_Profile_Service
)


export const profile_controller = {
    profile : async (req : Request, res : Response) => {

        try {
            const { user_id, email, role } = req;

            if (!user_id || !email || !role) 
                return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
        
            const metadata: Token_Context = { user_id, email, role };
            const grpc_response = await profile_use_case.profile(req.body, metadata)


        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    }
}