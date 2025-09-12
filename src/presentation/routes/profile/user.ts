import express from 'express'; 
import { profileController } from '@/presentation/controllers/profile/user';
import { validateFile, validateRequest } from '@/presentation/middlewares/validateRequest';
import { upload } from '@/util/multer';
import { changeEmailSchema, changePasswordSchema, deleteAccountSchema, updateProfileSchema } from '@/util/validation/profile/user';
import { verifyOtpSchema } from '@/util/validation/auth/user.schema';

export const userProfileRouter = express.Router();

// load profile details
userProfileRouter.get(
    '/', 
    profileController.profile
);

// update profile data
userProfileRouter.patch(
    '/update',
    upload.single("avatar"),
    validateFile({ fieldName : 'avatar' }),
    validateRequest(updateProfileSchema),
    profileController.update
)

// change password
userProfileRouter.post(
    '/password/change',
    validateRequest(changePasswordSchema),
    profileController.changePass
)

// change email
userProfileRouter.post(
    '/email/change',
    validateRequest(changeEmailSchema),
    profileController.changeEmail
)

// verify otp
userProfileRouter.post(
    '/email/change/verify',
    validateRequest(verifyOtpSchema),
    profileController.verifyOtp
)

// delete account
userProfileRouter.delete(
    '/delete',
    validateRequest(deleteAccountSchema),
    profileController.deleteAccount
)