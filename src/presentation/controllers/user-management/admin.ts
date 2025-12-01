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
            
            // Log request received with relevant query filters
            req.log.info({ page, limit, search, isBlocked, sort }, 'List users request received');

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
            
            // Log successful gRPC response with count
            req.log.info({ count: result.users?.length, page }, 'List users gRPC response received');
            
            return ResponseHandler.success(
                res,
                USER_MODERATION_SUCCESS_TYPES.LIST_USER_SUCCESS,
                HTTP_STATUS.OK,
                result
            );

        } catch (error) {
            // Log failure with relevant filters
            req.log.error({ error, query: req.validated?.query }, 'List users failed');
            next(error);
        }
    },

    toggleBlock : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userId } = req.validated?.params;
            const { block } = req.validated?.body;
            
            // Log request received with action (block/unblock) and target userId
            const action = block ? 'block' : 'unblock';
            req.log.info({ userId, action }, `Toggle user block request received (Action: ${action})`);

            const dto : BlockUserRequest = {
                userId,
                block
            }
            await grpcClient.BlockUser(dto);

            // Log successful gRPC response
            req.log.info({ userId, action }, `Toggle user block gRPC response received (Action: ${action} successful)`);
            
            return ResponseHandler.success(
                res,
                USER_MODERATION_SUCCESS_TYPES.BLOCK_OR_UNBLOCK_SUCCESS,
                HTTP_STATUS.OK
            )
        } catch (error) {
            // Log failure with target userId
            req.log.error({ error, userId: req.validated?.params.userId }, 'Toggle block failed');
            next(error);
        }
    }
}