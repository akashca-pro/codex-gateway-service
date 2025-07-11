import express from 'express';
import { auth_controller } from '../controllers/auth';

const Router = express.Router();

Router.post('signup',auth_controller.signup)







export default Router