import express from 'express'; 
import { profileController } from '@/presentation/controllers/profile/user';

export const userProfileRouter = express.Router();

userProfileRouter.get(
    '/', 
    profileController.profile);
