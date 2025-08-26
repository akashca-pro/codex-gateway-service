import { publicProblemController as controller } from '@/presentation/controllers/problem/public';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { CustomCodeRunSchema } from '@/util/validation/code-exec/customCode.schema';
import { getProblemlistQuerySchema, ProblemIdParamsSchema } from '@/util/validation/problem/problem.schema';
import express from 'express';

export const publicProblemRouter = express.Router();

// List problems
publicProblemRouter.get(
    '/',
    validateRequest(getProblemlistQuerySchema,'query'),
    controller.listProblem
)

// Get problem details
publicProblemRouter.get(
    '/:problemId',
    validateRequest(ProblemIdParamsSchema,'params'),
    controller.getProblem
)

// Custom code run
publicProblemRouter.post(
    '/codepad/run',
    validateRequest(CustomCodeRunSchema),
    controller.customCodeRun
)