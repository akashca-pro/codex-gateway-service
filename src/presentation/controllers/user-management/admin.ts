import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/auth-user-service/admin/AdminServices'
import { BlockUserRequest, ListUsersRequest } from "@akashcapro/codex-shared-utils";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { AdminServiceSuccessType } from "@/enums/auth-user/AdminSuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const adminUserController = {

    listUsers : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, search, sort, isArchived, isVerified, isBlocked, authProvider } = req.validated?.query;
            const dto : ListUsersRequest = {
                page,
                limit,
                search,
                sort,
                isArchived,
                isVerified,
                isBlocked,
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
    },

    toggleBlock : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userId } = req.validated?.params;
            const { block } = req.validated?.body;
            const dto : BlockUserRequest = {
                userId,
                block
            }
            await grpcClient.BlockUser(dto);
            return ResponseHandler.success(
                res,
                AdminServiceSuccessType.BlockOrUnBlockSuccess,
                HTTP_STATUS.OK
            )
        } catch (error) {
            next(error);
        }
    }
}