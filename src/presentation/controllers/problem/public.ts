import { ProblemSuccessType } from '@/enums/problem/SuccessTypes.enum';
import grpcClient from '@/infra/grpc/problem-service/ProblemServices'
import { GetProblemRequest, ListProblemRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem';
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
            const { page, limit, difficulty, tags, active, search, questionId } = req.validated?.query;
            const dto : ListProblemRequest = {
                page, limit, difficulty, tags, active, search, questionId
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
    }
}