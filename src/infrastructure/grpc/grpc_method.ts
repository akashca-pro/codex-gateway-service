import { Metadata, ServiceError } from "@grpc/grpc-js";

export type grpc_unary_method <Req,Res> = (
    request : Req,
    metadata : Metadata,
    callback : (error : ServiceError | null, response : Res) => void
) => void;
