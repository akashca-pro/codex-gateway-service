import { getGrpcMetrics, gethttpMetrics} from '@/presentation/controllers/metrics/admin';
import express from 'express';

export const adminMetricRouter = express.Router();

// Retrieve grpc request response metrics.
adminMetricRouter.get(
    '/grpcMetrics',
    getGrpcMetrics
);

// Retrieve http request response metrics.
adminMetricRouter.get(
    '/httpMetrics',
    gethttpMetrics
);
