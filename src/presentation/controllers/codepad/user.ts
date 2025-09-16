import { CustomCodeExecRequest } from "@akashcapro/codex-shared-utils/dist/proto/compiled/internal/code_manage";
import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/code-manage-service/CodeManageService'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { CodeManageSuccessType } from "@/enums/codeManage/SuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { CustomCodeResultRequest } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage";

export const codepadController = {

    run : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { tempId } = req.validated?.params;
            const { userCode, language } = req.validated?.body;
            const dto : CustomCodeExecRequest = {
                tempId,
                userCode,
                language
            }
            await grpcClient.customCodeExec(dto);
            return ResponseHandler.success(
                res,
                CodeManageSuccessType.CodeExecutionStarted,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        }
    },

    result : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { tempId } = req.validated?.params
            const dto : CustomCodeResultRequest = {
                tempId
            }
            const result = await grpcClient.customCodeResult(dto);
            return ResponseHandler.success(
                res,
                CodeManageSuccessType.CodeExecutionCompleted,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            next(error);
        }
    }

}