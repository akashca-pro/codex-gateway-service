// controllers/adminMetricsController.ts
import { Request, Response } from "express";
import client from "prom-client";
import { queryPrometheus } from "@/helper/promService"; // adjust path

export const getGrpcMetrics = async (req: Request, res: Response) => {
  try {
    const { job } = req.query; // optional ?job=auth-user-service
    const jobFilter = job ? `{job="${job}"}` : "";

    // Latency percentiles
    const p50 = await queryPrometheus(`
      histogram_quantile(0.5, sum(rate(grpc_request_duration_ms_bucket${jobFilter}[5m])) by (le, method))
    `);
    const p90 = await queryPrometheus(`
      histogram_quantile(0.9, sum(rate(grpc_request_duration_ms_bucket${jobFilter}[5m])) by (le, method))
    `);
    const p99 = await queryPrometheus(`
      histogram_quantile(0.99, sum(rate(grpc_request_duration_ms_bucket${jobFilter}[5m])) by (le, method))
    `);

    // Requests per method/status
    const requests = await queryPrometheus(`
      sum(rate(grpc_requests_total${jobFilter}[5m])) by (method, status)
    `);

    // Error rate %
    const errors = await queryPrometheus(`
      (
        sum(rate(grpc_requests_total${jobFilter}{status!="OK"}[5m])) by (method)
      )
      /
      (
        sum(rate(grpc_requests_total${jobFilter}[5m])) by (method)
      ) * 100
    `);

    // Build unique list of methods from all queries
    const methods = new Set([
      ...p50.map((m: any) => m.metric.method),
      ...p90.map((m: any) => m.metric.method),
      ...p99.map((m: any) => m.metric.method),
      ...requests.map((m: any) => m.metric.method),
      ...errors.map((m: any) => m.metric.method),
    ]);

    // Shape the response
    const data = Array.from(methods).map((method) => {
      const reqsForMethod = requests.filter((x: any) => x.metric.method === method);

      return {
        method,
        p50: Number(p50.find((x: any) => x.metric.method === method)?.value[1] || 0),
        p90: Number(p90.find((x: any) => x.metric.method === method)?.value[1] || 0),
        p99: Number(p99.find((x: any) => x.metric.method === method)?.value[1] || 0),
        requestCount: reqsForMethod.reduce(
          (sum: number, x: any) => sum + Number(x.value[1]),
          0
        ),
        errorRate: Number(errors.find((x: any) => x.metric.method === method)?.value[1] || 0),
      };
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching gRPC metrics:", err);
    res.status(500).json({ success: false, error: "Failed to fetch metrics" });
  }
};

export const gethttpMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = client.register.getMetricsAsJSON();

    res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching metrics",
    });
  }
};