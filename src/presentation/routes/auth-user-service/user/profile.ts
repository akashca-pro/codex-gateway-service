import express from 'express'; 
import { verifyAccessToken } from '@/presentation/middlewares/jwt'
import { profileController } from '@/presentation/controllers/auth-user-service/user/profile';

const Router = express.Router();

Router.get('/', verifyAccessToken('user'), profileController.profile);


export default Router;