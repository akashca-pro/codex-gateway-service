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
            req.log.info({ language, codeLength: userCode?.length }, 'Codepad run code request received');
            
            const dto : CustomCodeExecRequest = {
                userCode,
                language
            }
            const result = await grpcClient.customCodeExec(dto);
            
            req.log.info({ language, tempId: result.tempId }, 'Codepad run code gRPC response received');
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_STARTED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            req.log.error({ error, language: req.validated?.body.language }, 'Codepad run code failed');
            next(error);
        }
    },

    result : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { tempId } = req.validated?.params;
            req.log.info({ tempId }, 'Codepad result status request received');
            
            const cacheKey = `${REDIS_KEY_PREFIX.CUSTOM_CODE_NORMAL_CACHE}:${tempId}`
            const cached = await redis.get(cacheKey);
            
            if (!cached) {
                req.log.warn({ tempId }, 'Codepad result not found in cache (MISS). Execution pending.');
                return ResponseHandler.success(
                    res,
                    CODE_MANAGE_SUCCESS_TYPE.RESULT_STATUS,
                    HTTP_STATUS.OK,
                );
            }
            
            req.log.info({ tempId }, 'Codepad result fetched from cache (HIT).');
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_COMPLETED,
                HTTP_STATUS.OK,
                JSON.parse(cached!)
            )
        } catch (error) {
            req.log.error({ error, tempId: req.validated?.params.tempId }, 'Codepad result fetch failed');
            next(error);
        }
    }

}