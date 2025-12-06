import './config/tracing'
import https from 'https';
import fs from 'fs';
import express,{Request, Response} from 'express';
import dotenv from 'dotenv'
dotenv.config();
import helmet from 'helmet';
import cors from 'cors'
import logger from '@/util/pinoLogger';
import { httpLogger } from '@/util/pinoLogger';
import { config } from '@/config';
import cookieParser from 'cookie-parser';

// Routes

import { userRouter } from './presentation/routes/user';
import { adminRouter } from './presentation/routes/admin';
import { globalErrorHandler, notFound } from '@/util/errorHandlers'
import { httpMetricsMiddleware } from './config/metrics/metricsMiddleware';
import { publicRouter } from './presentation/routes/public';

const app = express();
app.set('trust proxy', 1);
app.use(httpLogger);

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())
app.use(helmet());

// metrics middleware
app.use(httpMetricsMiddleware);

app.use(cors({
  origin: [config.CLIENT_URL_1, config.CLIENT_URL_2],
  credentials: true,
  methods: ['GET', 'POST', 'PUT','PATCH','DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
}));

// Health check endpoint
app.get('/health', (req : Request, res : Response)=>{
    req.log.info('Health check hit')
    return res.status(200).json({ status : 'OK' });
})

// Routes
app.use('/api/v1/user', userRouter); // user auth and protected routes.
app.use('/api/v1/admin',adminRouter); // admin auth and protected routes.
app.use('/api/v1/public',publicRouter); // access without auth.

// 404
app.use(notFound);

// Global error handler.
app.use(globalErrorHandler);

// const httpsServer = https.createServer(credentials, app);

const startServer = () => {
    try {
        
        app.listen(config.GATEWAY_SERVICE_PORT, () => {
            logger.info(`HTTPS ${config.SERVICE_NAME} running on port ${config.GATEWAY_SERVICE_PORT}`);
        });

    } catch (error) {
        logger.error('Failed to start server : ', error);
        process.exit(1);
    }
};

startServer()
