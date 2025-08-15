import { adminProblemController as controller } from '@/presentation/controllers/problem/admin';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { 
    AddTestCaseSchema, createProblemSchema, 
    getProblemQuerySchema, UpdateBasicProblemDetailsSchema, 
    BulkUploadTestCasesSchema,RemoveTestCaseParamSchema,
    RemoveTestCaseQuerySchema, AddSolutionCodeSchema,
    UpdateSolutionCodeSchema,ProblemIdParamsSchema,
    SolutionCodeParamsSchema, 
} from '@/util/validation/problem/problem.schema';
import express from 'express';

export const adminProblemRouter = express.Router();

// List problems.
adminProblemRouter.get(
    '/',
    validateRequest(getProblemQuerySchema,'query'),
    controller.listProblem
)

// Create a new problem.
adminProblemRouter.post(
    '/create',
    validateRequest(createProblemSchema),
    controller.createProblem
)

// Get problem details.
adminProblemRouter.get(
    '/:problemId',
    validateRequest(ProblemIdParamsSchema,'params'),
    controller.getProblem
)

// Update basic problem details.
adminProblemRouter.patch(
    '/:problemId/update',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(UpdateBasicProblemDetailsSchema),
    controller.updateBasicProblemDetails
)

// Add test case.
adminProblemRouter.post(
    '/:problemId/testCases/add',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(AddTestCaseSchema),
    controller.addTestCase
)

// Bulk upload testcase.
adminProblemRouter.post(
    '/:problemId/testCases/bulkUpload',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(BulkUploadTestCasesSchema),
    controller.bulkUploadTestCase
)

// Remove test case.
adminProblemRouter.delete(
    '/:problemId/testCases/:testCaseId/remove',
    validateRequest(RemoveTestCaseParamSchema,'params'),
    validateRequest(RemoveTestCaseQuerySchema,'query'),
    controller.removeTestCase
)

// Add solution code.
adminProblemRouter.post(
    '/:problemId/solutionCodes/add',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(AddSolutionCodeSchema),
    controller.addSolutioncode
)

// Update solution code.
adminProblemRouter.patch(
    '/:problemId/solutionCodes/:solutionCodeId/update',
    validateRequest(SolutionCodeParamsSchema,'params'),
    validateRequest(UpdateSolutionCodeSchema),
    controller.updateSolutionCode
)

// Remove solution code.
adminProblemRouter.delete(
    '/:problemId/solutionCodes/:solutionCodeId/remove',
    validateRequest(SolutionCodeParamsSchema,'params'),
    controller.removeSolutionCode
)