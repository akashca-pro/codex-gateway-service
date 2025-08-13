import { Request, Response, NextFunction } from "express";
import { grpcMetricsCollector } from "./grpcMetricsCollector";


export const metricsMiddleware = (
    req : Request,
    res : Response, 
    next : NextFunction ) => {
        const startTime = Date.now();
        const methodName = `${req.method}_${req.path}_${req.ip}`;

        // save original methods
        const originalJson = res.json.bind(res);
        const originalSend = res.send.bind(res);

        // patch res.json
        res.json = (body : any) => {
            grpcMetricsCollector(methodName,res.statusCode.toString(), startTime);
            return originalJson(body);
        }

        // Patch res.send
        res.send = (body: any) => {
            grpcMetricsCollector(methodName, res.statusCode.toString(), startTime);
            return originalSend(body);
        };

        next();
}