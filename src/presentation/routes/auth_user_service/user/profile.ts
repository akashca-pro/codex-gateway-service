import express from 'express'; 
import { verifyAccessToken } from '@/presentation/middlewares/jwt'
import { ProfileController } from '@/presentation/controllers/auth-user-service/user/profile';

const Router = express.Router();


Router.get('/profile', verifyAccessToken, ProfileController.profile);


export default Router;