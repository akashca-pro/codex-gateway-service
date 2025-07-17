import express from 'express';
import { ProfileController } from '@/presentation/controllers/auth-user-service/admin/profile';
import { verifyAccessToken } from '@/presentation/middlewares/jwt'

const Router = express.Router();

const profileController = new ProfileController();

Router.get('/profile', verifyAccessToken, profileController.profile)


export default Router