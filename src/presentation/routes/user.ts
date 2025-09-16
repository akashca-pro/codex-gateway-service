import express from 'express';
import { userAuthRouter } from './auth/user';
import { userProfileRouter } from './profile/user';
import { verifyAccessToken } from '../middlewares/jwt';
import { userProblemRouter } from './problems/user';


export const userRouter = express.Router();

// Auth routes
userRouter.use(
    '/auth', 
    userAuthRouter
);

// Profile routes
userRouter.use(
    '/profile', 
    verifyAccessToken('user'), 
    userProfileRouter
);

// Problem routes
userRouter.use(
    '/problems',
    verifyAccessToken('user'),
    userProblemRouter
)