import { APP_LABELS } from '@/const/labels.const';
import { publicProblemController as controller } from '@/presentation/controllers/problem/public';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { runCodeExecParamSchema, runCodeExecSchema, runCodeResultParamSchema } from '@/validation/code-exec/run.schema';
import { getProblemlistQuerySchema, ProblemIdParamsSchema } from '@/validation/problem/problem.schema';
import express from 'express';

export const publicProblemRouter = express.Router();

// List problems with pagination and filters.
publicProblemRouter.get(
    '/',
    validateRequest(getProblemlistQuerySchema, APP_LABELS.QUERY),
    controller.listProblem
)

// Get details of the specific problem.
publicProblemRouter.get(
    '/:problemId',
    validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
    controller.getProblem
);

// Run code for the specific problem.
publicProblemRouter.post(
    '/:problemId/code/run',
    validateRequest(runCodeExecParamSchema, APP_LABELS.PARAM),
    validateRequest(runCodeExecSchema),
    controller.runCode
);

// Retrieve result of the run code execution.
publicProblemRouter.get(
    '/:problemId/:tempId/code/run/result',
    validateRequest(runCodeResultParamSchema, APP_LABELS.PARAM),
    controller.runResult
)
