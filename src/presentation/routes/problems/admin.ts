import { adminProblemController as controller } from '@/presentation/controllers/problem/admin';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { ProblemIdParamSchema, AddTestCaseSchema, createProblemSchema, 
    getProblemQuerySchema, UpdateBasicProblemDetailsSchema, 
    BulkUploadTestCasesSchema,
    RemoveTestCaseParamSchema,
    RemoveTestCaseQuerySchema
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
    validateRequest(ProblemIdParamSchema,'params'),
    controller.getProblem
)

// Update basic problem details.
adminProblemRouter.patch(
    '/:problemId/update',
    validateRequest(ProblemIdParamSchema,'params'),
    validateRequest(UpdateBasicProblemDetailsSchema),
    controller.updateBasicProblemDetails
)

// Add test case.
adminProblemRouter.post(
    '/:problemId/testCases/add',
    validateRequest(ProblemIdParamSchema,'params'),
    validateRequest(AddTestCaseSchema),
    controller.addTestCase
)

// Bulk upload testcase.
adminProblemRouter.post(
    '/:problemId/testCases/bulkUpload',
    validateRequest(ProblemIdParamSchema,'params'),
    validateRequest(BulkUploadTestCasesSchema),
    controller.bulkUploadTestCase
)

// Remove test case.
adminProblemRouter.patch(
    '/:problemId/testCases/:testCaseId/remove',
    validateRequest(RemoveTestCaseParamSchema,'params'),
    validateRequest(RemoveTestCaseQuerySchema,'query'),
    controller.removeTestCase
)