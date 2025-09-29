import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { ListUsersQuerySchema, ToggleBlockUserSchema, UserIdParamSchema } from '@/validation/user-management/userManagement.schema';
import { adminUserController as controller } from '@/presentation/controllers/user-management/admin';
import express from 'express'
import { APP_LABELS } from '@/const/labels.const';

export const adminUserRouter = express.Router();

adminUserRouter.get(
    '/',
    validateRequest(ListUsersQuerySchema, APP_LABELS.QUERY),
    controller.listUsers
)

adminUserRouter.patch(
    '/:userId/toggle-block',
    validateRequest(UserIdParamSchema, APP_LABELS.PARAM),
    validateRequest(ToggleBlockUserSchema),
    controller.toggleBlock
)