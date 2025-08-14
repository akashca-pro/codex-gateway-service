import express from 'express';
import { profileController } from '@/presentation/controllers/profile/admin';

export const adminProfileRouter = express.Router();


adminProfileRouter.get(
    '/', 
    profileController.profile);

