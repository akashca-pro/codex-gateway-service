import express from 'express';
import { userProblemController as controller } from '@/presentation/controllers/problem/user';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { submitCodeExecSchema, submitCodeResultSchema } from '@/util/validation/code-exec/submit.schema';
import { ProblemIdParamsSchema } from '@/util/validation/problem/problem.schema';

export const userProblemRouter = express.Router();

// Submit code for the specific problem.
userProblemRouter.post(
    '/:problemId/code/submit',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(submitCodeExecSchema),
    controller.submitProblem
);

// Retrieve submission result for the specific problem.
userProblemRouter.get(
    '/:problemId/code/submit/result',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(submitCodeResultSchema),
    controller.submissionResult
)

