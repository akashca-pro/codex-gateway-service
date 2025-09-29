import express from 'express'; 
import { profileController } from '@/presentation/controllers/profile/user';
import { validateFile, validateRequest } from '@/presentation/middlewares/validateRequest';
import { upload } from '@/util/multer';
import { changeEmailSchema, changePasswordSchema, deleteAccountSchema, emailSchema, updateProfileSchema } from '@/validation/profile/user';
import { verifyOtpSchema } from '@/validation/auth/user.schema';

export const userProfileRouter = express.Router();

// Load profile details
userProfileRouter.get(
    '/', 
    profileController.profile
);

// Update profile details
userProfileRouter.patch(
    '/update',
    upload.single("avatar"),
    validateFile({ fieldName : 'avatar' }),
    validateRequest(updateProfileSchema),
    profileController.update
)

// Update password based on current password.
userProfileRouter.post(
    '/password/change',
    validateRequest(changePasswordSchema),
    profileController.changePass
)

// Send otp to new email for email updation.
userProfileRouter.post(
    '/email/change',
    validateRequest(changeEmailSchema),
    profileController.changeEmail
)

// Resend otp for email updation
userProfileRouter.post(
    '/email/change/resend-otp',
    validateRequest(emailSchema),
    profileController.resendOtp
)

// Verify otp and update email
userProfileRouter.post(
    '/email/change/verify',
    validateRequest(verifyOtpSchema),
    profileController.verifyOtp
)

// Change the account status to archive.
userProfileRouter.patch(
    '/delete',
    validateRequest(deleteAccountSchema),
    profileController.deleteAccount
)