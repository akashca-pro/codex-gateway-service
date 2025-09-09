import {  CallOptions, Metadata, ServiceError } from "@grpc/grpc-js";

export type GrpcUnaryMethod <Req,Res> = (
    request : Req,
    metadata : Metadata,
    callOptions : CallOptions,
    callback : (error : ServiceError | null, response : Res) => void
) => void;
