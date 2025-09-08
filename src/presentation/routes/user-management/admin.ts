import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { ListUsersQuerySchema } from '@/util/validation/user-management/userManagement.schema';
import { adminUserController as controller } from '@/presentation/controllers/user-management/admin';
import express from 'express'

export const adminUserRouter = express.Router();

adminUserRouter.get(
    '/',
    validateRequest(ListUsersQuerySchema,'query'),
    controller.listUsers
)