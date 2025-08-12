import express from 'express';
import { userAuthRouter } from './auth/user';
import { userProfileRouter } from './profile/user';


export const userRouter = express.Router();

userRouter.use('/auth',userAuthRouter);
userRouter.use('/profile',userProfileRouter);