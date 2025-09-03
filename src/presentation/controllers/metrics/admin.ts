// controllers/adminMetricsController.ts
import { Request, Response } from "express";
import client from "prom-client";
import { queryPrometheus } from "@/helper/promService"; // adjust path

const safeParseMetricValue = (value: string | number | undefined): number => {
  if (value === "NaN" || value === undefined || value === null) {
    return 0;
  }
  return Number(value);
};

export const getGrpcMetrics = async (req: Request, res: Response) => {
  try {
    const { job } = req.query;
    const jobFilter = job ? `{job="${job}"}` : "";

    const latencyMetricName = `grpc_request_duration_ms_bucket${jobFilter}`;
    const requestMetricName = `grpc_requests_total${jobFilter}`;

    // Latency percentiles
    const p50 = await queryPrometheus(`
      histogram_quantile(0.5, sum(rate(${latencyMetricName}[5m])) by (le, method))
    `);
    const p90 = await queryPrometheus(`
      histogram_quantile(0.9, sum(rate(${latencyMetricName}[5m])) by (le, method))
    `);
    const p99 = await queryPrometheus(`
      histogram_quantile(0.99, sum(rate(${latencyMetricName}[5m])) by (le, method))
    `);

    // Request counts
    const requests = await queryPrometheus(`
      sum(increase(${requestMetricName}[5m])) by (method)
    `);
    const errors = await queryPrometheus(`
      sum(increase(${requestMetricName}{status!="OK"}[5m])) by (method)
    `);

    const methods = new Set<string>([
      ...p50.map((m: any) => m.metric.method),
      ...p90.map((m: any) => m.metric.method),
      ...p99.map((m: any) => m.metric.method),
      ...requests.map((m: any) => m.metric.method),
      ...errors.map((m: any) => m.metric.method),
    ]);

    const data = Array.from(methods).map((method) => {
      const totalRequests = safeParseMetricValue(requests.find((x: any) => x.metric.method === method)?.value[1]);
      const errorCount = safeParseMetricValue(errors.find((x: any) => x.metric.method === method)?.value[1]);

      return {
        method,
        p50: safeParseMetricValue(p50.find((x: any) => x.metric.method === method)?.value[1]).toFixed(2),
        p90: safeParseMetricValue(p90.find((x: any) => x.metric.method === method)?.value[1]).toFixed(2),
        p99: safeParseMetricValue(p99.find((x: any) => x.metric.method === method)?.value[1]).toFixed(2),
        requestCount: totalRequests.toFixed(0),
        errorRate: totalRequests > 0 ? ((errorCount / totalRequests) * 100).toFixed(2) : "0.00",
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