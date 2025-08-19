import { getGrpcMetrics, gethttpMetrics} from '@/presentation/controllers/metrics/admin';
import express from 'express';

export const adminMetricRouter = express.Router();

adminMetricRouter.get('/grpcMetrics',getGrpcMetrics)

adminMetricRouter.get('/httpMetrics',gethttpMetrics)
