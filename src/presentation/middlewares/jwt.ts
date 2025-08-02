import jwt, { decode } from 'jsonwebtoken';
import { config } from '@/config';
import { Request, Response, NextFunction } from 'express';
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';

import { CustomJwtPayload } from '@akashcapro/codex-shared-utils'
import ResponseHandler from '@akashcapro/codex-shared-utils/dist/utils/response_handler';
import HTTP_STATUS from '@akashcapro/codex-shared-utils/dist/utils/status_code';
import redis from '@/config/redis';

const verifyJwt = (token : string,secret : string) : CustomJwtPayload => {
    return jwt.verify(token,secret) as CustomJwtPayload
}

export const verifyAccessToken = (acceptedRole : string) => (
    req : Request,
    res : Response, 
    next : NextFunction) =>{

    const token = req.cookies['accessToken']

    if(!token)
        return ResponseHandler.error(res,'Token not found',HTTP_STATUS.UNAUTHORIZED)

    try {
        const decoded = verifyJwt(token, config.JWT_ACCESS_TOKEN_SECRET);

        if (!decoded || !decoded.userId || !decoded.email || !decoded.role || !decoded.tokenId) {
            return ResponseHandler.error(res, 'Invalid Token payload', HTTP_STATUS.UNAUTHORIZED);
        }

        if(decoded.role !== acceptedRole.toUpperCase())
            return ResponseHandler.error(res,'Entry Restricted',HTTP_STATUS.UNAUTHORIZED);

        redis.get(`blacklistAccessToken:${decoded.tokenId}`)
            .then((result)=>{
                if(result){
                    return ResponseHandler.error(res, 'Token is blacklisted', HTTP_STATUS.UNAUTHORIZED);
                }
        })

        req.userId = decoded.userId;
        req.email = decoded.email;
        req.role = decoded.role;
        req.accessTokenId = decoded.tokenId;
        req.accessTokenExp = decoded.exp;

        next();
        
    } catch (error) {
        logger.error('JWT access token verification failed',error);
        return ResponseHandler.error(res,'Invalid Token',HTTP_STATUS.UNAUTHORIZED)
    }
};

export const verifyRefreshToken = (acceptedRole : string) => (
    req : Request,
    res : Response,
    next : NextFunction) => {

    const token = req.cookies['refreshToken'];

    if(!token)
        return ResponseHandler.error(res,'Token not found',HTTP_STATUS.UNAUTHORIZED);

    try {
        const decoded = verifyJwt(token, config.JWT_REFRESH_TOKEN_SECRET);

        if (!decoded || !decoded.userId || !decoded.email || !decoded.role || !decoded.tokenId) {
            return ResponseHandler.error(res, 'Invalid Token', HTTP_STATUS.UNAUTHORIZED);
        }

        if(decoded.role !== acceptedRole.toUpperCase())
            return ResponseHandler.error(res,'Entry Restricted',HTTP_STATUS.UNAUTHORIZED);

        redis.get(`blacklistRefreshToken:${decoded.tokenId}`)
            .then((result)=>{
                if(result){
                    return ResponseHandler.error(res, 'Token is blacklisted', HTTP_STATUS.UNAUTHORIZED);
                }
        })

        req.userId = decoded.userId;
        req.email = decoded.email;
        req.role = decoded.role;
        req.refreshTokenId = decoded.tokenId;
        req.refreshTokenExp = decoded.exp;
        next();

    } catch (error) {
        logger.error('JWT refresh token verification failed',error);
        return ResponseHandler.error(res,'Invalid Token',HTTP_STATUS.UNAUTHORIZED)
    }

}

