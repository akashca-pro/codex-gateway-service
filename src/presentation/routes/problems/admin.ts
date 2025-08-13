import { adminProblemController } from '@/presentation/controllers/problem/admin';
import { verifyAccessToken } from '@/presentation/middlewares/jwt';
import { validateRequestBody } from '@/presentation/middlewares/validateRequest';
import { createProblemSchema } from '@/util/validation/problem/problem.schema';
import express from 'express';

export const adminProblemRouter = express.Router();

adminProblemRouter.post(
    '/create',
    verifyAccessToken('admin'),
    validateRequestBody(createProblemSchema),
    adminProblemController.createProblem
)
