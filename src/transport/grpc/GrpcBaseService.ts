import { Metadata, ServiceError, CallOptions } from '@grpc/grpc-js';
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';
import type { GrpcUnaryMethod } from '@/types/GrpcMethod';
import { config } from '@/config';

export class GrpcBaseService {
    
  protected grpcCall<Req, Res>(
    method: GrpcUnaryMethod<Req, Res>,
    request: Req,
    metadata: Metadata = new Metadata()
  ): Promise<Res> {
    return new Promise((resolve, reject) => {
      const deadline = new Date(Date.now() + config.DEFAULT_GRPC_TIMEOUT!);
      const callOptions : CallOptions = {deadline};
      method(
        request,
        metadata,
        callOptions,
        (error: ServiceError | null, response: Res) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
}