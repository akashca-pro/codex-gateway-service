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
            req.log.info({ questionId }, 'Check question id request recieved');
            await grpcClient.checkQuestionIdAvailability({ questionId }); 
            req.log.info({ questionId }, 'Check question id response recieved: Available');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.QUESTION_ID_AVAILABLE,
                HTTP_STATUS.OK
            );
        } catch (error) {
            req.log.error({ error, questionId: req.validated?.query.questionId }, 'Check question id request failed');
            next(error);
        }
    },

    checkTitle : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { title } = req.validated?.query;
            req.log.info({ title }, 'Check title request recieved');
            await grpcClient.checkTitleAvailablity({ title });
            req.log.info({ title }, 'Check title response recieved: Available');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.TITLE_AVAILABLE,
                HTTP_STATUS.OK
            );
        } catch (error) {
            req.log.error({ error, title: req.validated?.query.title }, 'Check title request failed');
            next(error);
        }
    },

    createProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {       
            const { questionId, title, description, difficulty, tags } = req.validated?.body
            req.log.info({ questionId, title }, 'CreateProblem request recieved');   
            const result = await grpcClient.createProblem({
                questionId,
                title,
                tags,
                description,
                difficulty
            });
            req.log.info({ problemId: result.Id, questionId, title }, 'CreateProblem gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEM_CREATED,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            req.log.error({ error, questionId: req.validated?.body.questionId, title: req.validated?.body.title }, 'CreateProblem failed');
            next(error)
        }
    },

    getProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {      
            const problemId = req.validated?.params.problemId
            req.log.info({ problemId }, 'Get problem request recieved');
            const result = await grpcClient.getProblem({ Id : problemId });
            req.log.info({ problemId, questionId: result.questionId }, 'Get problem gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEM_DETAILS_LOADED,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId }, 'Get problem failed');
            next(error);
        }
    },

    listProblem : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, difficulty, tags, search } = req.validated?.query;
            req.log.info({ page, limit, difficulty, tags, search }, 'List problem request recieved');
            const dto : ListProblemRequest = {
                page, limit, difficulty, tags, active: req.validated?.query.active, search, questionId: req.validated?.query.questionId, sort: req.validated?.query.sort
            }
            const result = await grpcClient.listProblems(dto);
            req.log.info({ count: result.problems?.length, page, limit }, 'List problem gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEMS_LOADED,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            req.log.error({ error, query: req.validated?.query }, 'List problem failed');
            next(error);
        }
    },

    updateBasicProblemDetails : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { questionId, title, active } = req.validated?.body;
            req.log.info({ problemId, questionId, title, active }, 'Update basic problem details request recieved');
            const { description, difficulty, tags, constraints, examples, starterCodes, solutionRoadmap } = req.validated?.body;

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
                starterCodes : starterCodes ?? [],
                solutionRoadmap : solutionRoadmap ?? [],
            }
            await grpcClient.updateBasicProblemDetails(dto);
            req.log.info({ problemId, questionId }, 'Update basic problem details gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.PROBLEM_BASIC_DETAILS_UPDATED,
                HTTP_STATUS.OK,
            );
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId }, 'Update basic problem details failed');
            next(error);
        }
    },

    addTestCase : async (req : Request, res :Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { testCaseCollectionType } = req.validated?.body;
            req.log.info({ problemId, testCaseCollectionType }, 'Add test case request recieved');
            const { testCase } = req.validated?.body;
            const dto : AddTestCaseRequest = {
                Id : problemId,
                testCaseCollectionType,
                testCase
            }
            await grpcClient.addTestCase(dto);
            req.log.info({ problemId, testCaseCollectionType }, 'Add test case gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.TEST_CASE_ADDED,
                HTTP_STATUS.OK
            );
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId }, 'Add test case failed');
            next(error);
        }
    },

    bulkUploadTestCase : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId } = req.validated?.params;
            const { testCaseCollectionType, testCase } = req.validated?.body;
            req.log.info({ problemId, testCaseCollectionType, count: testCase?.length }, 'Bulk upload test case request recieved');
            const dto : BulkUploadTestCasesRequest = {
                Id : problemId,
                testCase,
                testCaseCollectionType
            }
            await grpcClient.bulkUploadTestCases(dto);
            req.log.info({ problemId, testCaseCollectionType }, 'Bulk upload test case gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.MULTIPLE_TEST_CASES_ADDED,
                HTTP_STATUS.OK
            )
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId }, 'Bulk upload test case failed');
            next(error);
        }
    },

    removeTestCase : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { problemId, testCaseId } = req.validated?.params; 
            const { testCaseCollectionType } = req.validated?.query;
            req.log.info({ problemId, testCaseId, testCaseCollectionType }, 'Remove test case request recieved');
            const dto : RemoveTestCaseRequest = {
                Id : problemId,
                testCaseId,
                testCaseCollectionType
            }
            await grpcClient.removeTestCase(dto);
            req.log.info({ problemId, testCaseId }, 'Remove test case gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.REMOVED_TEST_CASE,
                HTTP_STATUS.OK
            );
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId, testCaseId: req.validated?.params.testCaseId }, 'Remove test case failed');
            next(error);
        }
    },

    updateTemplateCode : async (req : Request, res : Response,  next : NextFunction) => {
        try {
            const { problemId, templateCodeId } = req.validated?.params;
            const { language } = req.validated?.body;
            req.log.info({ problemId, templateCodeId, language }, 'Update template code request recieved');
            const { submitWrapperCode, runWrapperCode } = req.validated?.body;
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
            req.log.info({ problemId, templateCodeId, language }, 'Update template code gRPC response recieved');
            return ResponseHandler.success(
                res,
                PROBLEM_SUCCESS_TYPE.TEMPLATE_CODE_UPDATED,
                HTTP_STATUS.OK
            ); 
        } catch (error) {
            req.log.error({ error, problemId: req.validated?.params.problemId, templateCodeId: req.validated?.params.templateCodeId }, 'Update template code failed');
            next(error);
        }
    },
}