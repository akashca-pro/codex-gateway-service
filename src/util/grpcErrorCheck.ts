import { ServiceError } from "@grpc/grpc-js";

export const isGrpcError = (error: unknown): error is ServiceError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    "code" in error && typeof (error as any).code === 'number' &&
    "message" in error && typeof (error as any).message === 'string'
  );
};