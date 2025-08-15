import { adminProblemController as controller } from '@/presentation/controllers/problem/admin';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { ProblemIdParamSchema, AddTestCaseSchema, createProblemSchema, 
    getProblemQuerySchema, UpdateBasicProblemDetailsSchema, 
    BulkUploadTestCasesSchema
} from '@/util/validation/problem/problem.schema';
import express from 'express';

export const adminProblemRouter = express.Router();

// list problems.
adminProblemRouter.get(
    '/',
    validateRequest(getProblemQuerySchema,'query'),
    controller.listProblem
)

// create a new problem.
adminProblemRouter.post(
    '/create',
    validateRequest(createProblemSchema),
    controller.createProblem
)

// get problem details.
adminProblemRouter.get(
    '/:problemId',
    validateRequest(ProblemIdParamSchema,'params'),
    controller.getProblem
)

// update basic problem details.
adminProblemRouter.patch(
    '/:problemId/update',
    validateRequest(ProblemIdParamSchema,'params'),
    validateRequest(UpdateBasicProblemDetailsSchema),
    controller.updateBasicProblemDetails
)

// add test case.
adminProblemRouter.post(
    '/:problemId/testCases/add',
    validateRequest(ProblemIdParamSchema,'params'),
    validateRequest(AddTestCaseSchema),
    controller.addTestCase
)

// bulk upload testcase.
adminProblemRouter.post(
    '/:problemId/testCases/bulkUpload',
    validateRequest(ProblemIdParamSchema,'params'),
    validateRequest(BulkUploadTestCasesSchema),
    controller.bulkUploadTestCase
)
