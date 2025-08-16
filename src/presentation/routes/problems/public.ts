import { publicProblemController as controller } from '@/presentation/controllers/problem/public';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { getProblemQuerySchema, ProblemIdParamsSchema } from '@/util/validation/problem/problem.schema';
import express from 'express';

export const publicProblemRouter = express.Router();

// List problems
publicProblemRouter.get(
    '/',
    validateRequest(getProblemQuerySchema,'query'),
    controller.listProblem
)

// Get problem details
publicProblemRouter.get(
    '/:problemId',
    validateRequest(ProblemIdParamsSchema,'params'),
    controller.getProblem
)