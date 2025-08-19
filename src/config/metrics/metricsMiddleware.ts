import { Request, Response, NextFunction } from "express";
import { httpRequestCounter, httpRequestDuration } from "./metrics";

export const httpMetricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path, // safer
      status: res.statusCode.toString(),
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode.toString(),
      },
      duration
    );
  });

  next();
};
