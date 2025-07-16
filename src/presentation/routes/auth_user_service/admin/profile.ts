import express from 'express';
import { profile_controller } from '@/presentation/controllers/auth-user-service/admin/profile';
import { verifyAccessToken } from '@/presentation/middlewares/jwt'

const Router = express.Router();


Router.get('/profile', verifyAccessToken, profile_controller.profile)


export default Router