import { NextFunction, Request, Response } from "express";
import grpcClient from '@/transport/grpc/collab-service/collab-service'
import { CreateSessionRequest } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/collab";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { COLLAB_SUCCESS_TYPE } from "@/const/collabService/SuccessTypes.const";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const collabController = {
    createSession : async (req:Request, res : Response, next : NextFunction) => {
        try {
            const ownerId = req.userId;
            req.log.info({ ownerId }, 'Collab create session request received');

            const dto : CreateSessionRequest = {
                ownerId : ownerId!
            }
            const result = await grpcClient.createSession(dto);
            req.log.info({ ownerId }, 'Collab create session gRPC response received');
            return ResponseHandler.success(
                res,
                COLLAB_SUCCESS_TYPE.SESSION_CREATED,
                HTTP_STATUS.CREATED,
                result
            )
        } catch (error) {   
            next(error);
        }
    }
}