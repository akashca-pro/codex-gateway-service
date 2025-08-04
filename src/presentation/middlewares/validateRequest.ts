import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validateRequestBody = (schema: ZodObject<ZodRawShape>, options?: { requireFile?: boolean }) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);

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

  // If file validation is required (i.e., for multipart)
  if (options?.requireFile) {
    if (!req.file || req.file.fieldname !== "avatar") {
      return ResponseHandler.error(
        res,
        "Missing or invalid avatar file",
        HTTP_STATUS.BAD_REQUEST,
        [{ field: "avatar", message: "Avatar file is required" }]
      );
    }

    if (!req.file.mimetype.startsWith("image/")) {
      return ResponseHandler.error(
        res,
        "Invalid file type",
        HTTP_STATUS.BAD_REQUEST,
        [{ field: "avatar", message: "Only image files are allowed" }]
      );
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return ResponseHandler.error(
        res,
        "File too large",
        HTTP_STATUS.BAD_REQUEST,
        [{ field: "avatar", message: "Max file size is 5MB" }]
      );
    }
  }

  req.body = result.data;
  next();
};
