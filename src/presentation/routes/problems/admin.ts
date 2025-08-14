import { adminProblemController as controller } from '@/presentation/controllers/problem/admin';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { createProblemSchema, getProblemQuerySchema, UpdateBasicProblemDetailsSchema } from '@/util/validation/problem/problem.schema';
import express from 'express';

export const adminProblemRouter = express.Router();

adminProblemRouter.get(
    '/',
    validateRequest(getProblemQuerySchema,'query'),
    controller.listProblem
)

adminProblemRouter.post(
    '/create',
    validateRequest(createProblemSchema),
    controller.createProblem
)

adminProblemRouter.get(
    '/:problemId',
    controller.getProblem
)

adminProblemRouter.patch(
    '/:problemId/update',
    validateRequest(UpdateBasicProblemDetailsSchema),
    controller.updateBasicProblemDetails
)
