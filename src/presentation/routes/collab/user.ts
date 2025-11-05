import { collabController } from '@/presentation/controllers/collab/user';
import express from 'express';

export const userCollabRouter = express.Router();

// Create collab session and send back invite token.
userCollabRouter.post(
    '/session/create',
    collabController.createSession
)