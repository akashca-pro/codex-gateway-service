import express from 'express';
import { profileController } from '@/presentation/controllers/auth-user-service/admin/profile';
import { verifyAccessToken } from '@/presentation/middlewares/jwt'

const Router = express.Router();


Router.get('/', verifyAccessToken('admin'), profileController.profile)


export default Router