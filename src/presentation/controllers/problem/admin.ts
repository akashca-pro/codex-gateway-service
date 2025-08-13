import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/problem-service/ProblemServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { ProblemSuccessType } from "@/enums/problem/SuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { CustomError } from "@/util/customError";
import { ProblemErrorTypes } from "@/enums/problem/ErrorTypes.enum";

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
    }
}