import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/problem-service/ProblemServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { ProblemSuccessType } from "@/enums/problem/SuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { UpdateBasicProblemDetailsRequest as GrpcUpdateDTO, ListProblemRequest, StarterCode } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem";

export const adminProblemController = {

    createProblem : async (req : Request, res : Response, next : NextFunction) => {

        try {                    
            const result = await grpcClient.createProblem({
                questionId : req.body.questionId,
                title : req.body.title,
                description : req.body.description,
                difficulty : req.body.difficulty,
                tags : req.body.tags
            });

            return ResponseHandler.success(
                res,
                ProblemSuccessType.ProblemCreated,
                HTTP_STATUS.OK,
                result
            )
        
        } catch (error) {
            next(error)
        }
    },

    getProblem : async (req : Request, res : Response, next : NextFunction) => {

        try {      
            const problemId = req.params.problemId

            const result = await grpcClient.getProblem({ Id : problemId });

            return ResponseHandler.success(
                res,
                ProblemSuccessType.ProblemDetailsLoaded,
                HTTP_STATUS.OK,
                result
            )

        } catch (error) {
            next(error);
        }
    },

    listProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, difficulty, tag, active, search, questionId } = req.body;

            const dto : ListProblemRequest = {
                page, limit, difficulty, tag, active, search, questionId
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

    updateBasicProblemDetails : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.params;

            const dto : GrpcUpdateDTO = {
                Id : problemId,
                ...(req.body.questionId ? { questionId: req.body.questionId } : {}),
                ...(req.body.title ? { title: req.body.title } : {}),
                ...(req.body.description ? { description: req.body.description } : {}),
                ...(req.body.difficulty ? { difficulty: req.body.difficulty } : {}),
                ...(req.body.active !== undefined ? { active: req.body.active } : {}),
                tags : req.body?.tags ?? [],
                constraints : req.body?.constraints ?? [],
                examples : req.body?.examples ?? [],
                starterCodes : req.body?.starterCodes ?? []
            }

           await grpcClient.updateBasicProblemDetails(dto);
    
            return ResponseHandler.success(
                res,
                ProblemSuccessType.ProblemBasicDetailsUpdated,
                HTTP_STATUS.OK,
            );

        } catch (error) {
            next(error);
        }
    }
}