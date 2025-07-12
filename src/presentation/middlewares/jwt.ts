import jwt from 'jsonwebtoken';
import { config } from '@/config';
import { Request, Response, NextFunction } from 'express';
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';

import { CustomJwtPayload } from '@akashcapro/codex-shared-utils'
import ResponseHandler from '@akashcapro/codex-shared-utils/dist/utils/response_handler';
import HTTP_STATUS from '@akashcapro/codex-shared-utils/dist/utils/status_code';

const verify_jwt = (token : string) : CustomJwtPayload => {
    const secret = config.JWT_SECRET;
    return jwt.verify(token,secret) as CustomJwtPayload
}

export const token_verification = (req : Request, res : Response, next : NextFunction) =>{

    const token = req.cookies?.token

    if(!token)
        return ResponseHandler.error(res,'No token provided in cookies',HTTP_STATUS.UNAUTHORIZED)

    try {
        const decoded = verify_jwt(token);

        if(!decoded) return ResponseHandler.error(res,'Invalid Token',HTTP_STATUS.UNAUTHORIZED)

        req.user_id = decoded.user_id;
        req.email = decoded.email;
        req.role = decoded.role;
        next();
        
    } catch (error) {
        logger.error('JWT verification failed',error);
        return ResponseHandler.error(res,'Invalid Token',HTTP_STATUS.UNAUTHORIZED)
    }
};

export default token_verification