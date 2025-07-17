import {  Metadata, ServiceError } from "@grpc/grpc-js";

export type GrpcUnaryMethod <Req,Res> = (
    request : Req,
    metadata : Metadata,
    callback : (error : ServiceError | null, response : Res) => void
) => void;
