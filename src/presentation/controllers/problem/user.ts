import { NextFunction, Request, Response } from "express";
import { RunCodeExecRequest, SubmitCodeExecRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage'
import grpcClient from '@/infra/grpc/code-manage-service/CodeManageService'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { CodeManageSuccessType } from "@/enums/codeManage/SuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { SubmitCodeResultRequest } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage";

export const userProblemController = {

    submitProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { language, userCode, country } = req.validated?.body;
            const dto : SubmitCodeExecRequest = {
                problemId,
                userId : req.userId!,
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

    submissionResult : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { submissionId } = req.validated?.body;
            const dto : SubmitCodeResultRequest = {
                problemId,
                submissionId,
                userId : req.userId!
            };
            const result = await grpcClient.submitCodeResult(dto);
            return ResponseHandler.success(
                res,
                CodeManageSuccessType.SubmissionResultFetched,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            next(error);
        }
    }
}