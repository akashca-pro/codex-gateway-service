import jwt from 'jsonwebtoken';
import { config } from '@/config';
import { Request, Response, NextFunction } from 'express';
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';

import { CustomJwtPayload } from '@akashcapro/codex-shared-utils'
import ResponseHandler from '@akashcapro/codex-shared-utils/dist/utils/response_handler';
import HTTP_STATUS from '@akashcapro/codex-shared-utils/dist/utils/status_code';

const verify_jwt = (token : string,secret : string) : CustomJwtPayload => {
    return jwt.verify(token,secret) as CustomJwtPayload
}

export const verify_access_token = (req : Request, res : Response, next : NextFunction) =>{

    const token = req.cookies['access_token']

    if(!token)
        return ResponseHandler.error(res,'Token not found',HTTP_STATUS.UNAUTHORIZED)

    try {
        const decoded = verify_jwt(token, config.JWT_ACCESS_TOKEN_SECRET);

        if (!decoded || !decoded.user_id || !decoded.email || !decoded.role) {
            return ResponseHandler.error(res, 'Invalid Token payload', HTTP_STATUS.UNAUTHORIZED);
        }

        req.user_id = decoded.user_id;
        req.email = decoded.email;
        req.role = decoded.role;
        next();
        
    } catch (error) {
        logger.error('JWT access token verification failed',error);
        return ResponseHandler.error(res,'Invalid Token',HTTP_STATUS.UNAUTHORIZED)
    }
};

export const verify_refresh_token = (req : Request, res : Response, next : NextFunction) => {

    const token = req.cookies['refresh_token'];

    if(!token)
        return ResponseHandler.error(res,'Token not found',HTTP_STATUS.UNAUTHORIZED);

    try {
        const decoded = verify_jwt(token, config.JWT_REFRESH_TOKEN_SECRET);

        if (!decoded || !decoded.user_id || !decoded.email || !decoded.role) {
            return ResponseHandler.error(res, 'Invalid Token', HTTP_STATUS.UNAUTHORIZED);
        }

        req.user_id = decoded.user_id;
        req.email = decoded.email;
        req.role = decoded.role;
        next();

    } catch (error) {
        logger.error('JWT refresh token verification failed',error);
        return ResponseHandler.error(res,'Invalid Token',HTTP_STATUS.UNAUTHORIZED)
    }

}
