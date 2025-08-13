import { adminProblemController as controller } from '@/presentation/controllers/problem/admin';
import { verifyAccessToken } from '@/presentation/middlewares/jwt';
import { validateRequestBody } from '@/presentation/middlewares/validateRequest';
import { createProblemSchema, getProblemSchema } from '@/util/validation/problem/problem.schema';
import express from 'express';

export const adminProblemRouter = express.Router();

adminProblemRouter.post(
    '/create',
    verifyAccessToken('admin'),
    validateRequestBody(createProblemSchema),
    controller.createProblem
)

adminProblemRouter.get(
    '/:problemId',
    verifyAccessToken('admin'),
    validateRequestBody(getProblemSchema),
    controller.getProblem
)
