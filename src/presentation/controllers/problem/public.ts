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
            req.log.info({ problemId }, 'Get public problem request received');
            const dto : GetProblemRequest = {
                Id : problemId
            }
            const result = await grpcProblemClient.getProblemForPublic(dto);
            req.log.info({ problemId }, 'Get public problem gRPC response received');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEM_DETAILS_LOADED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId }, 'Get public problem failed');
            next(error);
        }
    },
    listProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, difficulty, tags, search } = req.validated?.query;
            req.log.info({ page, limit, difficulty, tags, search }, 'List public problems request received');
            const dto : ListProblemRequest = {
                page, limit, difficulty, tags, active : true, search, questionId: req.validated?.query.questionId, sort: req.validated?.query.sort
            }
            const result = await grpcProblemClient.listProblems(dto);
            req.log.info({ count: result.problems?.length, page, limit }, 'List public problems gRPC response received');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEMS_LOADED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            req.log.error({ error, query: req.validated?.query }, 'List public problems failed');
            next(error);
        }
    },
    runCode : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { language, testCases } = req.validated?.body;
            req.log.info({ problemId, language, testCaseCount: testCases?.length }, 'Run code execution request received');
            const { userCode } = req.validated?.body;
            const dto : RunCodeExecRequest = {
                problemId,
                userCode,
                language,
                testCases
            }
            const result = await grpcCodeManageClient.runCodeExec(dto);
            req.log.info({ problemId, tempId: result.tempId }, 'Run code execution gRPC response received');
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_STARTED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId }, 'Run code execution failed');
            next(error);       
        }
    },
    runResult : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { tempId } = req.validated?.params;
            req.log.info({ tempId }, 'Run result status request received');
            const cacheKey = `${REDIS_KEY_PREFIX.RUN_CODE_NORMAL_CACHE}:${tempId}`
            const cached = await redis.get(cacheKey);

            if (!cached) {
                req.log.warn({ tempId }, 'Run result not found in cache (MISS). Execution still running.');
                return ResponseHandler.success(
                    res,
                    CODE_MANAGE_SUCCESS_TYPE.RESULT_STATUS,
                    HTTP_STATUS.OK,
                );
            }
            
            req.log.info({ tempId }, 'Run result fetched from cache (HIT).');
            return ResponseHandler.success(
                res,
                CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_COMPLETED,
                HTTP_STATUS.OK,
                JSON.parse(cached)
            )
        } catch (error) {
            req.log.error({ error, tempId: req.validated?.params.tempId }, 'Run result failed');
            next(error);
        }
    }
}