import express from 'express'; 
import { profileController } from '@/presentation/controllers/profile/user';
import { validateFile, validateRequest } from '@/presentation/middlewares/validateRequest';
import { upload } from '@/util/multer';
import { updateProfileSchema } from '@/util/validation/profile/user';
import { verifyAccessToken } from '@/presentation/middlewares/jwt';

export const userProfileRouter = express.Router();

userProfileRouter.get(
    '/', 
    profileController.profile);

userProfileRouter.patch(
    '/update',
    upload.single("avatar"),
    validateFile({ fieldName : 'avatar' }),
    validateRequest(updateProfileSchema),
    profileController.update
)