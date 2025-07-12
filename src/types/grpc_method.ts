import { CallOptions, Metadata, ServiceError } from "@grpc/grpc-js";

export type grpc_unary_method <Req,Res> = (
    request : Req,
    metadata : Metadata,
    options : CallOptions,
    callback : (error : ServiceError | null, response : Res) => void
) => void;
