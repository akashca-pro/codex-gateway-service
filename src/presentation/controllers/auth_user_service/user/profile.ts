import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { User_Profile_Use_Cases } from "@/application/auth_user_service/user/user_profile_use_cases";
import { Grpc_User_Profile_Service } from "@/infrastructure/grpc/auth_user_service/user/impl_user_profile_services";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import { Token_Context } from "@/types/token_context";


const user_use_case = new User_Profile_Use_Cases(new Grpc_User_Profile_Service());

export const profile_controller = {

    profile : async (req : Request, res : Response) => {

        try {
            const { user_id, email, role } = req;

            if (!user_id || !email || !role) 
                return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);
        
            const metadata: Token_Context = { user_id, email, role };
            const grpc_response = await user_use_case.profile(req.body, metadata)
            return ResponseHandler.success(res,'Profile data loaded successfully',HTTP_STATUS.OK,{...grpc_response})
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    }

}