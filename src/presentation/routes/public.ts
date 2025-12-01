import express from 'express';
import { publicProblemRouter } from './problems/public';
import { codepadRouter } from './codepad/user';

export const publicRouter = express.Router();

publicRouter.use(
    '/problems',
    publicProblemRouter
)

publicRouter.use(
    '/codepad',
    codepadRouter
)