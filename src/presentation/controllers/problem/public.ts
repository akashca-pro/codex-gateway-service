import { PROBLEM_SUCCESS_TYPE } from '@/const/problem/SuccessTypes.const';
import grpcProblemClient from '@/transport/grpc/problem-service/ProblemServices'
import grpcCodeManageClient from '@/transport/grpc/code-manage-service/CodeManageService'
import { GetProblemRequest, ListProblemRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem';
import { RunCodeExecRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage';
import ResponseHandler from '@akashcapro/codex-shared-utils/dist/utils/response_handler';
import HTTP_STATUS from '@akashcapro/codex-shared-utils/dist/utils/status_code';
import { NextFunction, Request, Response } from "express";
import { CODE_MANAGE_SUCCESS_TYPE } from '@/const/codeManage/SuccessTypes.const';
import { REDIS_KEY_PREFIX } from '@/config/redis/keyPrefix';
import redis from '@/config/redis';

export const publicProblemController = {
    getProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const dto : GetProblemRequest = {
                Id : problemId
            }
            const result = await grpcProblemClient.getProblemForPublic(dto);
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEM_DETAILS_LOADED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            next(error);
        }
    },
    listProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, difficulty, tags, search, questionId, sort } = req.validated?.query;
            const dto : ListProblemRequest = {
                page, limit, difficulty, tags, active : true, search, questionId, sort
            }
            const result = await grpcProblemClient.listProblems(dto);
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEMS_LOADED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            next(error);
        }
    },
    runCode : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { language, userCode, testCases } = req.validated?.body;
            const dto : RunCodeExecRequest = {
                problemId,
                userCode,
                language,
                testCases
            }
            const result = await grpcCodeManageClient.runCodeExec(dto);
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
    runResult : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { tempId } = req.validated?.params;
            const cacheKey = `${REDIS_KEY_PREFIX.RUN_CODE_NORMAL_CACHE}:${tempId}`
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
                JSON.parse(cached)
            )
        } catch (error) {
            next(error);
        }
    }
}