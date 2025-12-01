import { APP_LABELS } from '@/const/labels.const';
import { adminProblemController as controller } from '@/presentation/controllers/problem/admin';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { 
    AddTestCaseSchema, createProblemSchema, 
    getProblemlistQuerySchema, UpdateBasicProblemDetailsSchema, 
    BulkUploadTestCasesSchema,RemoveTestCaseParamSchema,
    RemoveTestCaseQuerySchema,
    ProblemIdParamsSchema,
    checkQuestionIdQuerySchema,
    checkTitleQuerySchema,
    TemplateCodeParamsSchema,
    UpdateTemplateCodeSchema, 
} from '@/validation/problem/problem.schema';
import express from 'express';

export const adminProblemRouter = express.Router();

// List problems.
adminProblemRouter.get(
    '/',
    validateRequest(getProblemlistQuerySchema, APP_LABELS.QUERY),
    controller.listProblem
)

// Check question id availabilty.
adminProblemRouter.get(
    '/checkQuestionId',
    validateRequest(checkQuestionIdQuerySchema, APP_LABELS.QUERY),
    controller.checkQuestionId
)

// Check problem title availabilty.
adminProblemRouter.get(
    '/checkTitle',
    validateRequest(checkTitleQuerySchema, APP_LABELS.QUERY),
    controller.checkTitle
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
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    controller.getProblem
)

// Update basic problem details.
adminProblemRouter.patch(
    '/:problemId/update',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(UpdateBasicProblemDetailsSchema),
    controller.updateBasicProblemDetails
)

// Add test case.
adminProblemRouter.post(
    '/:problemId/testCases/add',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(AddTestCaseSchema),
    controller.addTestCase
)

// Bulk upload testcase.
adminProblemRouter.post(
    '/:problemId/testCases/bulkUpload',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(BulkUploadTestCasesSchema),
    controller.bulkUploadTestCase
)

// Remove test case.
adminProblemRouter.delete(
    '/:problemId/testCases/:testCaseId/remove',
    validateRequest(RemoveTestCaseParamSchema, APP_LABELS.PARAM),
    validateRequest(RemoveTestCaseQuerySchema, APP_LABELS.QUERY),
    controller.removeTestCase
)

// Update template code.
adminProblemRouter.patch(
    '/:problemId/templateCodes/:templateCodeId/update',
    validateRequest(TemplateCodeParamsSchema, APP_LABELS.PARAM),
    validateRequest(UpdateTemplateCodeSchema),
    controller.updateTemplateCode
)
