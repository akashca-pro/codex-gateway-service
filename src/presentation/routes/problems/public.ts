import { publicProblemController as controller } from '@/presentation/controllers/problem/public';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { runCodeExecParamSchema, runCodeExecSchema } from '@/util/validation/code-exec/run.schema';
import { getProblemlistQuerySchema, ProblemIdParamsSchema } from '@/util/validation/problem/problem.schema';
import express from 'express';

export const publicProblemRouter = express.Router();

// List problems with pagination and filters.
publicProblemRouter.get(
    '/',
    validateRequest(getProblemlistQuerySchema,'query'),
    controller.listProblem
)

// Get details of the specific problem.
publicProblemRouter.get(
    '/:problemId',
    validateRequest(ProblemIdParamsSchema,'params'),
    controller.getProblem
);

// Run code for the specific problem.
publicProblemRouter.post(
    '/:problemId/:tempId/code/run',
    validateRequest(runCodeExecParamSchema,'params'),
    validateRequest(runCodeExecSchema),
    controller.runCode
);

// Retrieve result of the run code execution.
publicProblemRouter.get(
    '/:problemId/:tempId/code/run/result',
    validateRequest(runCodeExecParamSchema,'params'),
    controller.runResult
)
