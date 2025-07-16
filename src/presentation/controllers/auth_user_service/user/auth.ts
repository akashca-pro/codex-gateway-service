import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { User_Auth_Use_Cases } from "@/application/auth_user_service/user/user_auth_use_cases";
import { Grpc_User_Auth_Service } from "@/infrastructure/grpc/auth_user_service/user/impl_user_auth_services";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import { set_cookie } from "@/utility/set-cookie";

const auth_use_case = new User_Auth_Use_Cases(
    new Grpc_User_Auth_Service
);

export const auth_controller = {
    
    signup : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_use_case.signup(req.body);
            return ResponseHandler.success(res, grpc_response.message , HTTP_STATUS.OK);

        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    resend_otp : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_use_case.resend_otp(req.body);
            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    verify_otp : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_use_case.verify_otp(req.body);

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

            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    login : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_use_case.login(req.body);

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

    google_login : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_use_case.google_login(req.body);
            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    forgot_password : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_use_case.forgot_password(req.body);
            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    change_password : async (req : Request, res : Response) => {

        try {
            const grpc_response = await auth_use_case.change_password(req.body);
            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    refresh_token : async (req : Request, res : Response) => {
        try {
            const { user_id, email, role } = req;

            if (!user_id || !email || !role) 
                return ResponseHandler.error(res, "Invalid Token", HTTP_STATUS.UNAUTHORIZED);

            const grpc_response = await auth_use_case.refresh_token({user_id, email, role})

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