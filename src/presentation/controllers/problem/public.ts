import { ProblemSuccessType } from '@/enums/problem/SuccessTypes.enum';
import grpcProblemClient from '@/infra/grpc/problem-service/ProblemServices'
import grpcCodeManageClient from '@/infra/grpc/code-manage-service/CodeManageService'
import { GetProblemRequest, ListProblemRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem';
import { RunCodeExecRequest, RunCodeResultRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage';
import ResponseHandler from '@akashcapro/codex-shared-utils/dist/utils/response_handler';
import HTTP_STATUS from '@akashcapro/codex-shared-utils/dist/utils/status_code';
import { NextFunction, Request, Response } from "express";
import { CodeManageSuccessType } from '@/enums/codeManage/SuccessTypes.enum';

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
                ProblemSuccessType.ProblemDetailsLoaded,
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
                ProblemSuccessType.ProblemsLoaded,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            next(error);
        }
    },
    runCode : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId, tempId } = req.validated?.params;
            const { language, userCode, testCases } = req.validated?.body;
            const dto : RunCodeExecRequest = {
                problemId,
                tempId,
                userCode,
                language,
                testCases
            }
            await grpcCodeManageClient.runCodeExec(dto);
            return ResponseHandler.success(
                res,
                CodeManageSuccessType.CodeExecutionStarted,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);       
        }
    },
    runResult : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId, tempId } = req.validated?.params;
            const dto : RunCodeResultRequest = {
                problemId,
                tempId
            }
            const result = await grpcCodeManageClient.customCodeResult(dto);
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