import { CustomCodeExecRequest } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage";
import { NextFunction, Request, Response } from "express";
import grpcClient from '@/transport/grpc/code-manage-service/CodeManageService'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { CODE_MANAGE_SUCCESS_TYPE } from "@/const/codeManage/SuccessTypes.const";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { REDIS_KEY_PREFIX } from "@/config/redis/keyPrefix";
import redis from "@/config/redis";

export const codepadController = {

    run : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userCode, language } = req.validated?.body;
            const dto : CustomCodeExecRequest = {
                userCode,
                language
            }
            const result = await grpcClient.customCodeExec(dto);
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_STARTED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            next(error);
        }
    },

    result : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { tempId } = req.validated?.params;
            const cacheKey = `${REDIS_KEY_PREFIX.CUSTOM_CODE_NORMAL_CACHE}:${tempId}`
            const cached = await redis.get(cacheKey);
            if (!cached) {
                return ResponseHandler.success(
                    res,
                    CODE_MANAGE_SUCCESS_TYPE.RESULT_STATUS,
                    HTTP_STATUS.OK,
                );
            }
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_COMPLETED,
                HTTP_STATUS.OK,
                JSON.parse(cached!)
            )
        } catch (error) {
            next(error);
        }
    }

}