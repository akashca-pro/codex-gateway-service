import express from 'express'; 
import { verify_access_token } from '@/presentation/middlewares/jwt'
import { profile_controller } from '@/presentation/controllers/auth_user_service/user/profile';

const Router = express.Router();


Router.get('/profile', verify_access_token, profile_controller.profile);


export default Router;