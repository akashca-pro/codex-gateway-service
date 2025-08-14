import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "./customError";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import { isGrpcError } from "./grpcErrorCheck";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import PrettyError from "pretty-error";
import { grpcMetricsCollector } from "@/helper/grpcMetricsCollector";

export const notFound = (req : Request,res : Response) => {
    logger.error(`Resource not found : ${req.method} ${req.url} `);
    return ResponseHandler.error(res, 'Resource not found', HTTP_STATUS.NOT_FOUND);
}

export const globalErrorHandler = (
    err : unknown, 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    const time = new Date().toISOString();
    const { method, originalUrl, ip } = req;

    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage('express');

    logger.error({
        time,
        method,
        url: originalUrl,
        ip,
        message: err instanceof Error ? err.message : String(err),
        // stack: err instanceof Error ? pe.render(new Error(err.stack)) : undefined
    });

    const startTime = Date.now();
    const methodName = `${req.method}_${req.path}`;

    grpcMetricsCollector(methodName,res.statusCode.toString() || '500', startTime);

    if(isGrpcError(err)){
        const statusCode = mapGrpcCodeToHttp(err.code) || HTTP_STATUS.INTERNAL_SERVER_ERROR;
        const errorMessage = err.message?.split(':')[1]?.trim() || 'Internal Server Error';
        return ResponseHandler.error(res, errorMessage, statusCode);
    }

    if(err instanceof CustomError){
        return ResponseHandler.error(
            res,
            err.message,
            err.statusCode,
            err.details
        )
    }

    return ResponseHandler.error(res, 'InternalServerError', HTTP_STATUS.INTERNAL_SERVER_ERROR);
}   