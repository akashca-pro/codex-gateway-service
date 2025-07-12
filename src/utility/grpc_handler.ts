import { Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { mapGrpcCodeToHttp } from "@akashcapro/codex-shared-utils";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

interface WithMessage {
  message: string;
}

type Use_Case_Method<Req_Body, Grpc_Response extends WithMessage > = (data: Req_Body) => Promise<Grpc_Response>;

export function grpc_handler<ReqBody, Grpc_Response extends WithMessage>(
  method_name: string,
  use_case_method: Use_Case_Method<ReqBody, Grpc_Response>
) {
  return async (req: Request<unknown, unknown, ReqBody>, res: Response): Promise<Response> => {
    try {
      const payload = {
        ...(req.body as object),
        ...(req.query as object),
        ...(req.params as object),
      } as ReqBody;
      const grpc_response = await use_case_method(payload);
      logger.info(`[${method_name}] Proxy success for ${req.path}`);
      return ResponseHandler.success(res, grpc_response.message, HTTP_STATUS.OK);
    } catch (error) {
      const grpc_error = error as ServiceError;
      logger.error(`[${method_name}] Proxy error at ${req.path}: ${grpc_error.message}`);
      return ResponseHandler.error(
        res,
        "Internal server error",
        mapGrpcCodeToHttp(grpc_error.code)
      );
    }
  };
}
