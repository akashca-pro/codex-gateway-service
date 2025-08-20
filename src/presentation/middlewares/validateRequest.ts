import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape } from "zod";

type RequestPart = "body" | "query" | "params"

export const validateRequest = (schema: ZodObject<ZodRawShape> , part : RequestPart = "body") => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req[part]);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return ResponseHandler.error(
      res,
      "Validation Error",
      HTTP_STATUS.BAD_REQUEST,
      formattedErrors
    );
  }

  req.validated = {
    body : part === 'body' ? result.data : req.validated?.body,
    params : part === 'params' ? result.data : req.validated?.params,
    query : part === 'query' ? result.data : req.validated?.query
  }

  next();
};

interface FileValidationOptions {
  fieldName: string;
  maxSizeMB?: number;
  allowedMimeTypes?: string[];
}

export const validateFile = (options: FileValidationOptions) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fieldName, maxSizeMB = 5, allowedMimeTypes = ["image/"] } = options;


  if (!req.file || req.file.fieldname !== fieldName) {
    return ResponseHandler.error(res, `Missing or invalid ${fieldName} file`, HTTP_STATUS.BAD_REQUEST);
  }

  if (!allowedMimeTypes.some(type => req?.file?.mimetype.startsWith(type))) {
    return ResponseHandler.error(res, "Invalid file type", HTTP_STATUS.BAD_REQUEST);
  }

  if (req.file.size > maxSizeMB * 1024 * 1024) {
    return ResponseHandler.error(res, `File too large, max size is ${maxSizeMB}MB`, HTTP_STATUS.BAD_REQUEST);
  }

  next();
};