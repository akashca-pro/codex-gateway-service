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
            const { userId } = req;
            req.log.info({userId},'Submit problem request recieved')
            const { problemId } = req.validated?.params;
            const { language, userCode, country } = req.validated?.body;
            const dto : SubmitCodeExecRequest = {
                problemId,
                userId : req.userId!,
                username : req.username!,
                language,
                userCode,
                ...(country ? { country : country } : {})
            }
            const result = await grpcCodeManageClient.submitCodeExec(dto);
            req.log.info({userId, submissionId: result.submissionId},'Submit problem response recieved');
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.SUBMISSION_CREATED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            req.log.error({userId : req.userId},'Submit problem failed')
            next(error);
        }
    },

    submissionResult : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userId } = req;
            req.log.info({userId},'Submission result request recieved')
            const { submissionId } = req.validated?.params;
            const cacheKey = `${REDIS_KEY_PREFIX.SUBMISSION_NORMAL_CACHE}:${submissionId}`;
            const cached = await redis.get(cacheKey);
            if (!cached) {
                req.log.warn({userId, submissionId},'Submission result not found in cache. Returning status only.');
                return ResponseHandler.success(
                    res,
                    CODE_MANAGE_SUCCESS_TYPE.RESULT_STATUS,
                    HTTP_STATUS.OK,
                );
            }
            req.log.info({userId, submissionId},'Submission result fetched from cache');
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.SUBMISSION_RESULT_FETCHED,
                HTTP_STATUS.OK,
                JSON.parse(cached!)
            )
        } catch (error) {
            req.log.error({userId : req.userId},'Submission result failed')
            next(error);
        }
    },

    listProblemSpecifiSubmissions :  async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userId } = req;
            req.log.info({userId},'List problem specific submissions request recieved')
            const { problemId } = req.validated?.params;
            const { limit, nextCursor } = req.validated?.query;
            const dto : ListProblemSpecificSubmissionRequest = {
                problemId,
                limit,
                userId : req.userId!,
                nextCursor : nextCursor ?? undefined
            }
            const result = await grpcSubmissionClient.listProblemSpecificSubmission(dto);
            req.log.info({userId, problemId, count: result.submissions?.length},'List problem specific submissions response recieved');
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.LIST_SUBMISSIONS,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            req.log.error({userId : req.userId},'List problem specific submissions failed')
            next(error);
        }
    },

    getPreviousHints : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userId } = req;
            req.log.info({userId},'Get previous hints request recieved')
            const { problemId } = req.validated?.params;
            const result = await grpcSubmissionClient.getPreviousHints({
                userId : userId!,
                problemId
            })
            req.log.info({userId, problemId},'Get previous hints response recieved')
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.PREVIOUS_HINTS_FETCHED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            req.log.error({userId : req.userId},'Get previous hints failed')
            next(error);
        }
    },

    requestHint : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userId } = req;
            const { problemId } = req.validated?.params;
            const { userCode, language } = req.body;
            req.log.info({userId},'Request hint request recieved');
            const result = await grpcSubmissionClient.requestHint({
                userId : req.userId!,
                problemId,
                userCode,
                language
            })
            req.log.info({userId, problemId},'Request hint response recieved');
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.NEW_HINT_RECIEVIED,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            req.log.error({userId : req.userId},'Request hint failed')
            next(error);
        }
    },

    requestFullSolution : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userId } = req;
            const { problemId } = req.validated?.params;
            const { language } = req.body;
            req.log.info({userId},'Request full solution request recieved');
            const result = await grpcSubmissionClient.requestFullSolution({
                userId : "9fd8f8e7-33ed-4542-86bc-f60455f5c96f",
                problemId,
                language
            })
            req.log.info({userId, problemId},'Request full solution response recieved');
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.FULL_SOLUTION_RECIEVED,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            next(error);
        }
    }
}