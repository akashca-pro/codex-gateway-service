import { Metadata, ServiceError, CallOptions } from '@grpc/grpc-js';
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';
import type { grpc_unary_method } from '@/types/grpc_method';
import { config } from '@/config';

export abstract class GrpcBaseService {
    
  protected grpc_call<Req, Res>(
    method: grpc_unary_method<Req, Res>,
    request: Req,
    metadata: Metadata = new Metadata()
  ): Promise<Res> {
    return new Promise((resolve, reject) => {
      const deadline = new Date(Date.now() + config.DEFAULT_GRPC_TIMEOUT); // e.g. 5000ms

      method(
        request,
        metadata,
        { deadline } as CallOptions,
        (error: ServiceError | null, response: Res) => {
          if (error) {
            logger.error(`gRPC error in ${method.name}: ${error.message}`);
            return reject(error);
          }
          resolve(response);
        }
      );
    });
  }
}