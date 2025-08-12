import express from 'express'; 
import { verifyAccessToken } from '@/presentation/middlewares/jwt'
import { profileController } from '@/presentation/controllers/profile/user';

export const userProfileRouter = express.Router();

userProfileRouter.get('/', verifyAccessToken('user'), profileController.profile);
