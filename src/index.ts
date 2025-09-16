import express,{Request, Response} from 'express';
import dotenv from 'dotenv'
dotenv.config();
import helmet from 'helmet';
import cors from 'cors'
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';
import { config } from '@/config';
import cookieParser from 'cookie-parser';
import { startMetricsServer } from './config/metrics';

// Routes

import { userRouter } from './presentation/routes/user';
import { adminRouter } from './presentation/routes/admin';
import { globalErrorHandler, notFound } from '@/util/errorHandlers'
import { httpMetricsMiddleware } from './config/metrics/metricsMiddleware';
import { publicRouter } from './presentation/routes/public';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())
app.use(helmet());

// metrics middleware
app.use(httpMetricsMiddleware);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT','PATCH','DELETE', 'OPTIONS'],
}));

// Health check endpoint
app.get('/health', (req : Request, res : Response)=>{
    res.status(200).json({ status : 'OK' });
})

// Routes
app.use('/api/v1/user', userRouter); // user auth and protected routes.
app.use('/api/v1/admin',adminRouter); // admin auth and protected routes.
app.use('/api/v1/public',publicRouter); // access without auth.

// 404
app.use(notFound);

// Global error handler.
app.use(globalErrorHandler);

const startServer = () => {
    try {
        
        app.listen(config.PORT,()=>{
            logger.info(`${config.SERVICE_NAME} running on port ${config.PORT}`);
        })
        startMetricsServer(config.METRICS_PORT!)
    } catch (error) {
        logger.error('Failed to start server : ',error);
        process.exit(1);
    }
};

startServer()
