import express from 'express';
import { publicProblemRouter } from './problems/public';

export const publicRouter = express.Router();

publicRouter.use(
    '/problems',
    publicProblemRouter
)
