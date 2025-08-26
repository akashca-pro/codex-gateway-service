import { NextFunction, Request, Response } from "express";
import { RunCodeExecRequest, SubmitCodeExecRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/internal/code_manage'
import grpcClient from '@/infra/grpc/code-manage-service/CodeManageService'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { CodeManageSuccessType } from "@/enums/codeManage/SuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const userProblemController = {

    submitProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { userId, language, userCode, country } = req.validated?.body;
            const dto : SubmitCodeExecRequest = {
                problemId,
                userId,
                language,
                userCode,
                ...(country ? { country : country } : {})
            }

            const result = await grpcClient.submitCodeExec(dto);

            return ResponseHandler.success(
                res,
                CodeManageSuccessType.SubmissionCreated,
                HTTP_STATUS.OK,
                result
            );

        } catch (error) {
            next(error);
        }
    },

    runProblem : async (req : Request, res : Response, next : NextFunction) => {

        try {
            const { problemId } = req.validated?.params;
            const { userId, language, userCode, testCases } = req.validated?.body;

            const dto : RunCodeExecRequest = {
                problemId,
                userId,
                userCode,
                language,
                testCases
            }

            await grpcClient.runCodeExec(dto);

            return ResponseHandler.success(
                res,
                CodeManageSuccessType.RunProblemCode,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);       
        }
    },

    customCode : async (req : Request, res : Response, next : NextFunction) => {

        try {
            
        } catch (error) {
            next(error);   
        }
    }
}