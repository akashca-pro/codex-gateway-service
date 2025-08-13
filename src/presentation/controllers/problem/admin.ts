import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/problem-service/ProblemServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { ProblemSuccessType } from "@/enums/problem/SuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const adminProblemController = {

    createProblem : async (req : Request, res : Response, next : NextFunction) => {

        try {
                       
            const grpcResponse = await grpcClient.createProblem({
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
                grpcResponse
            )
        
        } catch (error) {
            next(error)
        }
    }
}