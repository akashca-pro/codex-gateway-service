import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateRequestBody = (schema  : ZodObject ) => (
    req : Request,
    res : Response,
    next : NextFunction
) => {

    const result = schema.safeParse(req.body);

    if(!result.success){

    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
        
        return ResponseHandler.error(
            res,
            'Validation Error',
            HTTP_STATUS.BAD_REQUEST,
            formattedErrors
        )
        
    }

    next();
}