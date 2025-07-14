import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { Auth_Use_Cases } from "@/application/auth_user_service/auth_use_cases";
import { Grpc_Auth_Service } from "@/infrastructure/grpc/auth_user_service/auth_services";

import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import { set_cookie } from "@/utility/set-cookie";

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

    verify_otp : async (req : Request, res : Response) => {

        try {
            const grpc_response = await authUseCase.verify_otp(req.body);

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
            const grpc_response = await authUseCase.login(req.body);

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
            const grpc_response = await authUseCase.google_login(req.body);
            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    forgot_password : async (req : Request, res : Response) => {

        try {
            const grpc_response = await authUseCase.forgot_password(req.body);
            return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK)
        } catch (error) {
            const grpc_error = error as ServiceError;
            logger.error(grpc_error.message);
            return ResponseHandler.error(res, 'Internal server error', mapGrpcCodeToHttp(grpc_error.code));
        }

    },

    change_password : async (req : Request, res : Response) => {

        try {
            const grpc_response = await authUseCase.change_password(req.body);
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
                return ResponseHandler.error(res, "Missing user identity in request", HTTP_STATUS.UNAUTHORIZED);

            const grpc_response = await authUseCase.refresh_token({user_id, email, role})

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