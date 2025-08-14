import express from 'express';
import { userAuthRouter } from './auth/user';
import { userProfileRouter } from './profile/user';
import { verifyAccessToken } from '../middlewares/jwt';


export const userRouter = express.Router();

userRouter.use('/auth', userAuthRouter);
userRouter.use('/profile', verifyAccessToken('user'), userProfileRouter);