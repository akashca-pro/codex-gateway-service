import express from 'express';
import { userProblemController as controller } from '@/presentation/controllers/problem/user';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { submitCodeExecSchema, submitCodeResultQuerySchema } from '@/validation/code-exec/submit.schema';
import { ProblemIdParamsSchema } from '@/validation/problem/problem.schema';
import { APP_LABELS } from '@/const/labels.const';

export const userProblemRouter = express.Router();

// Submit code for the specific problem.
userProblemRouter.post(
    '/:problemId/code/submit',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(submitCodeExecSchema),
    controller.submitProblem
);

// Retrieve submission result for the specific problem.
userProblemRouter.get(
    '/:problemId/code/submit/result',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    validateRequest(submitCodeResultQuerySchema, APP_LABELS.QUERY),
    controller.submissionResult
)

