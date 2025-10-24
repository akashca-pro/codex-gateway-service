import winston from "winston";
import { config } from "@/config";
import { context, trace } from "@opentelemetry/api";

const appendTraceIdFormat = winston.format((info) => {
  const span = trace.getSpan(context.active());
  if (span) {
    const ctx = span.spanContext();
    info.trace_id = ctx.traceId;
    info.span_id = ctx.spanId;
  }
  return info;
});
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: config.SERVICE_NAME },
  format: winston.format.combine(
    appendTraceIdFormat(), // <-- attach trace_id if available
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, service, trace_id, stack }) => {
          const trace = trace_id ? ` [trace_id=${trace_id}]` : "";
          return `[${timestamp}] [${level}] [${service}]${trace}: ${message}${stack ? `\n${stack}` : ""}`;
        })
      ),
    }),
  ],
});

export default logger;
