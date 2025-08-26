import express from 'express';
import { userProblemController as controller } from '@/presentation/controllers/problem/user';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { submitCodeExecSchema } from '@/util/validation/code-exec/submit.schema';
import { runCodeExecSchema } from '@/util/validation/code-exec/run.schema';
import { ProblemIdParamsSchema } from '@/util/validation/problem/problem.schema';

export const userProblemRouter = express.Router();

// Submit code with problem
userProblemRouter.post(
    '/:problemId/submit',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(submitCodeExecSchema),
    controller.submitProblem
);

// Run code with problem
userProblemRouter.post(
    '/:problemId/run',
    validateRequest(ProblemIdParamsSchema,'params'),
    validateRequest(runCodeExecSchema),
);
