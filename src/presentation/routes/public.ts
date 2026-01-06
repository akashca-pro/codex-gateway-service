import express from 'express';
import { publicProblemRouter } from './problems/public';
import { codepadRouter } from './codepad/user';
import { problemsLimiter, codepadLimiter } from '../middlewares/rate-limiter';

export const publicRouter = express.Router();

publicRouter.use(
    '/problems',
    problemsLimiter,
    publicProblemRouter
)

publicRouter.use(
    '/codepad',
    codepadLimiter,
    codepadRouter
)