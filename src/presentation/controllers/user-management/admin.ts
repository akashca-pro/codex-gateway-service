import { NextFunction, Request, Response } from "express";
import grpcClient from '@/transport/grpc/auth-user-service/AdminServices'
import { BlockUserRequest, ListUsersRequest } from "@akashcapro/codex-shared-utils";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { USER_MODERATION_SUCCESS_TYPES } from "@/const/auth-user/UserModerationSuccessTypes.const";
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
                USER_MODERATION_SUCCESS_TYPES.LIST_USER_SUCCESS,
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
                USER_MODERATION_SUCCESS_TYPES.BLOCK_OR_UNBLOCK_SUCCESS,
                HTTP_STATUS.OK
            )
        } catch (error) {
            next(error);
        }
    }
}