import { ProblemSuccessType } from '@/enums/problem/SuccessTypes.enum';
import grpcClient from '@/infra/grpc/problem-service/ProblemServices'
import grpcCodeManageClient from '@/infra/grpc/code-manage-service/CodeManageService'
import { GetProblemRequest, ListProblemRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem';
import { CustomCodeExecRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/internal/code_manage';
import ResponseHandler from '@akashcapro/codex-shared-utils/dist/utils/response_handler';
import HTTP_STATUS from '@akashcapro/codex-shared-utils/dist/utils/status_code';
import { NextFunction, Request, Response } from "express";

export const publicProblemController = {
    getProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const dto : GetProblemRequest = {
                Id : problemId
            }

            const result = await grpcClient.getProblemForPublic(dto);

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
            const result = await grpcClient.listProblems(dto);

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

    customCodeRun : async (req : Request, res : Response, next : NextFunction) => {

        try {
            const { tempId, userCode, language } = req.validated?.body;
            const dto : CustomCodeExecRequest = {
                tempId,
                userCode,
                language
            };

            await grpcCodeManageClient.customCodeExec(dto);

            return ResponseHandler.success(
                res,
                ProblemSuccessType.CustomCodeRun,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);   
        }
    }
}