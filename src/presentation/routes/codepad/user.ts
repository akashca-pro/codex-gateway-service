import express from 'express';
import { validateRequest } from '@/presentation/middlewares/validateRequest';
import { CustomCodeRunSchema, TempIdParamSchema } from '@/validation/code-exec/codepad.schema';
import { codepadController as controller } from '@/presentation/controllers/codepad/user'

export const codepadRouter = express.Router();

// Run custom code execution.
codepadRouter.post(
    '/code/run',
    validateRequest(CustomCodeRunSchema),
    controller.run
);

// Retrieve custom code execution result.
codepadRouter.get(
    '/code/:tempId/run/result',
    validateRequest(TempIdParamSchema,'params'),
    controller.result
);



