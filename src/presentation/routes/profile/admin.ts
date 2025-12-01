import express from 'express';
import { profileController } from '@/presentation/controllers/profile/admin';
import { upload } from '@/util/multer';
import { validateFile, validateRequest } from '@/presentation/middlewares/validateRequest';
import { changeEmailSchema, changePasswordSchema, deleteAccountSchema, emailSchema, updateProfileSchema } from '@/validation/profile/user';
import { verifyOtpSchema } from '@/validation/auth/user.schema';
export const adminProfileRouter = express.Router();

// Profile
adminProfileRouter.get(
    '/', 
    profileController.profile
);

// Update profile details
adminProfileRouter.patch(
    '/update',
    upload.single("avatar"),
    validateFile({ fieldName : 'avatar' }),
    validateRequest(updateProfileSchema),
    profileController.update
)

// Update password based on current password.
adminProfileRouter.post(
    '/password/change',
    validateRequest(changePasswordSchema),
    profileController.changePass
)

// Send otp to new email for email updation.
adminProfileRouter.post(
    '/email/change',
    validateRequest(changeEmailSchema),
    profileController.changeEmail
)

// Resend otp for email updation
adminProfileRouter.post(
    '/email/change/resend-otp',
    validateRequest(emailSchema),
    profileController.resendOtp
)

// Verify otp and update email
adminProfileRouter.post(
    '/email/change/verify',
    validateRequest(verifyOtpSchema),
    profileController.verifyOtp
)

// Change the account status to archive.
adminProfileRouter.patch(
    '/delete',
    validateRequest(deleteAccountSchema),
    profileController.deleteAccount
)