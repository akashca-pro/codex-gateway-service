import { NextFunction, Request, Response } from "express";
import { SubmitCodeExecRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage'
import grpcCodeManageClient from '@/transport/grpc/code-manage-service/CodeManageService';
import grpcSubmissionClient from '@/transport/grpc/problem-service/SubmissionServices';
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { CODE_MANAGE_SUCCESS_TYPE } from "@/const/codeManage/SuccessTypes.const";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { REDIS_KEY_PREFIX } from "@/config/redis/keyPrefix";
import redis from "@/config/redis";
import { ListProblemSpecificSubmissionRequest } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem";
import { SUBMISSION_SUCCESS_TYPE } from "@/const/problem/SuccessTypes.const";

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
            const result = await grpcCodeManageClient.submitCodeExec(dto);
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.SUBMISSION_CREATED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            next(error);
        }
    },

    submissionResult : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { submissionId } = req.validated?.params;
            const cacheKey = `${REDIS_KEY_PREFIX.SUBMISSION_NORMAL_CACHE}:${submissionId}`;
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
                CODE_MANAGE_SUCCESS_TYPE.SUBMISSION_RESULT_FETCHED,
                HTTP_STATUS.OK,
                JSON.parse(cached!)
            )
        } catch (error) {
            next(error);
        }
    },

    listProblemSpecifiSubmissions :  async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { limit, nextCursor } = req.validated?.query;
            const dto : ListProblemSpecificSubmissionRequest = {
                problemId,
                limit,
                userId : req.userId!,
                nextCursor : nextCursor ?? undefined
            }
            console.log(dto)
            const result = await grpcSubmissionClient.listProblemSpecificSubmission(dto);
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.LIST_SUBMISSIONS,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            next(error);
        }
    }
}