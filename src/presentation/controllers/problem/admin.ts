import { NextFunction, Request, Response } from "express";
import grpcClient from '@/transport/grpc/problem-service/ProblemServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { PROBLEM_SUCCESS_TYPE } from "@/const/problem/SuccessTypes.const";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { 
    AddTestCaseRequest, 
    BulkUploadTestCasesRequest, 
    UpdateBasicProblemDetailsRequest as GrpcUpdateDTO, 
    ListProblemRequest, 
    RemoveTestCaseRequest,
    UpdateTemplateCodeRequest
} from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem";

export const adminProblemController = {

    checkQuestionId : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { questionId } = req.validated?.query;
            await grpcClient.checkQuestionIdAvailability({ questionId }); 
            return ResponseHandler.success(
                    res,
                    PROBLEM_SUCCESS_TYPE.QUESTION_ID_AVAILABLE,
                    HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        }
    },

    checkTitle : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { title } = req.validated?.query;
            await grpcClient.checkTitleAvailablity({ title });
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.TITLE_AVAILABLE,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        }
    },

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
                PROBLEM_SUCCESS_TYPE.PROBLEM_CREATED,
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
                PROBLEM_SUCCESS_TYPE.PROBLEM_DETAILS_LOADED,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            next(error);
        }
    },

    listProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, difficulty, tags, active, search, questionId, sort } = req.validated?.query;
            const dto : ListProblemRequest = {
                page, limit, difficulty, tags, active, search, questionId, sort
            }
            const result = await grpcClient.listProblems(dto);
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
                PROBLEM_SUCCESS_TYPE.PROBLEM_BASIC_DETAILS_UPDATED,
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
                PROBLEM_SUCCESS_TYPE.TEST_CASE_ADDED,
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
                PROBLEM_SUCCESS_TYPE.MULTIPLE_TEST_CASES_ADDED,
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
                PROBLEM_SUCCESS_TYPE.REMOVED_TEST_CASE,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        }
    },

    updateTemplateCode : async (req : Request, res : Response,  next : NextFunction) => {
        try {
            const { problemId, templateCodeId } = req.validated?.params;
            const { language, submitWrapperCode, runWrapperCode } = req.validated?.body;
            const dto : UpdateTemplateCodeRequest = {
                Id : problemId,
                templateCodeId : templateCodeId,
                updatedTemplateCode : {
                    language : language ?? undefined,
                    submitWrapperCode : submitWrapperCode ?? undefined,
                    runWrapperCode : runWrapperCode ?? undefined
                }
            }
            await grpcClient.updateTemplateCode(dto);
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.TEMPLATE_CODE_UPDATED,
                HTTP_STATUS.OK
            ); 
        } catch (error) {
            next(error);
        }
    },
}