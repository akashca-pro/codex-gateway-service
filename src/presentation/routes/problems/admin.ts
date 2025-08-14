import { adminProblemController as controller } from '@/presentation/controllers/problem/admin';
import { verifyAccessToken } from '@/presentation/middlewares/jwt';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { createProblemSchema, getProblemQuerySchema, UpdateBasicProblemDetailsSchema } from '@/util/validation/problem/problem.schema';
import express from 'express';

export const adminProblemRouter = express.Router();

adminProblemRouter.get(
    '/',
    // verifyAccessToken('admin'),
    validateRequest(getProblemQuerySchema,'query'),
    controller.listProblem
)

adminProblemRouter.post(
    '/create',
    verifyAccessToken('admin'),
    validateRequest(createProblemSchema),
    controller.createProblem
)

adminProblemRouter.get(
    '/:problemId',
    // verifyAccessToken('admin'),
    controller.getProblem
)

adminProblemRouter.patch(
    '/:problemId/update',
    verifyAccessToken('admin'),
    validateRequest(UpdateBasicProblemDetailsSchema),
    controller.updateBasicProblemDetails
)
