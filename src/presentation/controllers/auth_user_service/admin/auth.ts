import { Admin_Auth_Use_Cases } from "@/application/auth_user_service/admin/admin_auth_use_cases";
import { Grpc_Admin_Auth_Service } from "@/infrastructure/grpc/auth_user_service/admin/impl_admin_auth_service";
import { set_cookie } from "@/utility/set-cookie";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { ServiceError } from "@grpc/grpc-js";
import { Request, Response } from "express";


const auth_admin_case = new Admin_Auth_Use_Cases(
    new Grpc_Admin_Auth_Service
)

export const auth_controller = {

    login : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_admin_case.login(req.body);

            set_cookie(
                  res,
                 'access_token',
                  grpc_response.access_token,
                  24 * 60 * 60 * 1000);

            set_cookie(
                  res,
                 'refresh_token',
                  grpc_response.refresh_token,
                  7 * 24 * 60 * 60 * 1000);

            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK);
            
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    refresh_token : async(req : Request, res : Response) => {
        try {
            const { user_id, email, role } = req;

            if (!user_id || !email || !role) 
                return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);

            const grpc_response = await auth_admin_case.refresh_token({user_id, email, role});

            set_cookie(
                  res,
                 'access_token',
                  grpc_response.access_token,
                  24 * 60 * 60 * 1000);

            return ResponseHandler.success(res,grpc_response.message);

        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }
    }
}