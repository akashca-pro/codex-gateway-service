import { NextFunction, Request, Response } from "express";
import grpcClient from '@/infra/grpc/problem-service/ProblemServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { ProblemSuccessType } from "@/enums/problem/SuccessTypes.enum";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { 
    AddSolutionCodeRequest,
    AddTestCaseRequest, 
    BulkUploadTestCasesRequest, 
    UpdateBasicProblemDetailsRequest as GrpcUpdateDTO, 
    ListProblemRequest, 
    RemoveSolutionCodeRequest, 
    RemoveTestCaseRequest,
    UpdateSolutionCodeRequest
} from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem";

export const adminProblemController = {

    createProblem : async (req : Request, res : Response, next : NextFunction) => {

        try {           
            const { questionId, title, description, difficulty, tags } = req.validated?.body
            
            const result = await grpcClient.createProblem({
                questionId,
                title,
                tags,
                description,
                difficulty
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
            const problemId = req.validated?.params.problemId

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
    },

    updateBasicProblemDetails : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { questionId, title, description, difficulty,
                 active, tags, constraints, examples, starterCodes } = req.validated?.body;

            const dto : GrpcUpdateDTO = {
                Id : problemId,
                ...(questionId ? { questionId: questionId } : {}),
                ...(title ? { title: title } : {}),
                ...(description ? { description: description } : {}),
                ...(difficulty ? { difficulty: difficulty } : {}),
                ...(active !== undefined ? { active: active } : {}),
                tags : tags ?? [],
                constraints : constraints ?? [],
                examples : examples ?? [],
                starterCodes : starterCodes ?? []
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
    },

    addTestCase : async (req : Request, res :Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { testCaseCollectionType, testCase } = req.validated?.body;

            const dto : AddTestCaseRequest = {
                Id : problemId,
                testCaseCollectionType,
                testCase
            }

            await grpcClient.addTestCase(dto);

            return ResponseHandler.success(
                res,
                ProblemSuccessType.TestCaseAdded,
                HTTP_STATUS.OK
            );
            
        } catch (error) {
            next(error);
        }
    },

    bulkUploadTestCase : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { testCaseCollectionType, testCase } = req.validated?.body;

            const dto : BulkUploadTestCasesRequest = {
                Id : problemId,
                testCase,
                testCaseCollectionType
            }

            await grpcClient.bulkUploadTestCases(dto);

            return ResponseHandler.success(
                res,
                ProblemSuccessType.MultipleTestCasesAdded,
                HTTP_STATUS.OK
            )
        } catch (error) {
            next(error);
        }
    },

    removeTestCase : async (req : Request, res : Response, next : NextFunction) => {

        try {
            const { problemId, testCaseId } = req.validated?.params; 
            const { testCaseCollectionType } = req.validated?.query;
            
            const dto : RemoveTestCaseRequest = {
                Id : problemId,
                testCaseId,
                testCaseCollectionType
            }
            await grpcClient.removeTestCase(dto);

            return ResponseHandler.success(
                res,
                ProblemSuccessType.RemovedTestCase,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);
        }
    },

    addSolutioncode : async (req : Request, res : Response, next : NextFunction) => {

        try {
            const { problemId } = req.validated?.params;
            const { Id, code, executionTime, language, memoryTaken } = req.validated?.body;

            const dto : AddSolutionCodeRequest = {
                Id : problemId,
                solutionCode : {
                    Id,
                    code,
                    executionTime,
                    language,
                    memoryTaken
                }
            }

            await grpcClient.addSolutionCode(dto);

            return ResponseHandler.success(
                res,
                ProblemSuccessType.SolutionCodeAdded,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);
        }
    },

    updateSolutionCode : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId, solutionCodeId } = req.validated?.params;
            const { code, language, executionTime, memoryTaken } = req.validated?.body;
            
            const dto : UpdateSolutionCodeRequest = {
                Id : problemId,
                solutionCodeId,
                solutionCode : {
                    code,
                    language,
                    executionTime,
                    memoryTaken
                }
            }
            
            await grpcClient.updateSolutionCode(dto);

            return ResponseHandler.success(
                res,
                ProblemSuccessType.SolutionCodeUpdated,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);
        }
    },
    
    removeSolutionCode : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId, solutionCodeId } = req.validated?.params;

            const dto : RemoveSolutionCodeRequest = {
                Id : problemId,
                solutionCodeId
            }

            await grpcClient.removeSolutionCode(dto);

            return ResponseHandler.success(
                res,
                ProblemSuccessType.SolutionCodeRemoved,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);
        }
    }
}