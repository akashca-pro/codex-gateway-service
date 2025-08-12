import express from 'express';
import { profileController } from '@/presentation/controllers/profile/admin';
import { verifyAccessToken } from '@/presentation/middlewares/jwt'

export const adminProfileRouter = express.Router();


adminProfileRouter.get('/', verifyAccessToken('admin'), profileController.profile)

