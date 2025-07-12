import express from 'express'; 
import { token_verification } from '@/presentation/middlewares/jwt'
import { user_controller } from '@/presentation/controllers/auth_user/user';

const Router = express.Router();


Router.get('/profile', token_verification, user_controller.profile);


export default Router;