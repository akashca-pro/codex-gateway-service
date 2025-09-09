import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { ListUsersQuerySchema, ToggleBlockUserSchema, UserIdParamSchema } from '@/util/validation/user-management/userManagement.schema';
import { adminUserController as controller } from '@/presentation/controllers/user-management/admin';
import express from 'express'

export const adminUserRouter = express.Router();

adminUserRouter.get(
    '/',
    validateRequest(ListUsersQuerySchema,'query'),
    controller.listUsers
)

adminUserRouter.patch(
    '/:userId/toggle-block',
    validateRequest(UserIdParamSchema,'params'),
    validateRequest(ToggleBlockUserSchema),
    controller.toggleBlock
)