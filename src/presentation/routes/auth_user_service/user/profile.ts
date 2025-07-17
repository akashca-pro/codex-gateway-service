import express from 'express'; 
import { verifyAccessToken } from '@/presentation/middlewares/jwt'
import { ProfileController } from '@/presentation/controllers/auth-user-service/user/profile';

const Router = express.Router();

const profileController = new ProfileController()

Router.get('/profile', verifyAccessToken, profileController.profile);


export default Router;