import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/auth-user-service/admin/AdminServices'
import { ListUsersRequest } from "@akashcapro/codex-shared-utils";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { AdminServiceSuccessType } from "@/enums/auth-user/AdminSuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const adminUserController = {

    listUsers : async (req : Request, res : Response, next : NextFunction) => {
        try {
            console.log('hit')
            const { page, limit, search, sort, isArchived, isVerified, authProvider } = req.validated?.query;
            const dto : ListUsersRequest = {
                page,
                limit,
                search,
                sort,
                isArchived,
                isVerified,
                authProvider
            }
            const result = await grpcClient.listUsers(dto);
            return ResponseHandler.success(
                res,
                AdminServiceSuccessType.ListUserSuccess,
                HTTP_STATUS.OK,
                result
            );

        } catch (error) {
            next(error);
        }
    }
}