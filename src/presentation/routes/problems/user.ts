import express from 'express';
import { userProblemController as controller } from '@/presentation/controllers/problem/user';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { submitCodeExecSchema } from '@/validation/code-exec/submit.schema';
import { ListProblemSpecificsubmissionsSchemaQuery, ProblemIdParamsSchema, RequestFullSolutionSchema, RequestHintSchema, SubmitResultParamsSchema } from '@/validation/problem/problem.schema';
import { APP_LABELS } from '@/const/labels.const';

export const userProblemRouter = express.Router();

// Get previous ai hints for specific problem.
userProblemRouter.get(
    '/:problemId/hints',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    controller.getPreviousHints
)  

// Get ai hint for a specific problem.
userProblemRouter.post(
    '/:problemId/hints',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(RequestHintSchema),
    controller.requestHint
)

// Get full solution for a specific problem.
userProblemRouter.post(
    '/:problemId/solution',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(RequestFullSolutionSchema),
    controller.requestFullSolution
)

// Submit code for the specific problem.
userProblemRouter.post(
    '/:problemId/code/submit',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(submitCodeExecSchema),
    controller.submitProblem
);

// Retrieve submission result for the specific problem.
userProblemRouter.get(
    '/:problemId/:submissionId/code/submit/result',
    validateRequest(SubmitResultParamsSchema, APP_LABELS.PARAM),
    controller.submissionResult
)

// List problem specific submissions (cursor pagination)
userProblemRouter.get(
    '/:problemId/submissions',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(ListProblemSpecificsubmissionsSchemaQuery, APP_LABELS.QUERY),
    controller.listProblemSpecifiSubmissions
)

