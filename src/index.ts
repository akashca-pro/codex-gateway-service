import express,{Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv'
dotenv.config();
import { limiter } from '@/presentation/middlewares/rate-limiter';
import helmet from 'helmet';
import cors from 'cors'
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';
import { config } from '@/config';
import cookieParser from 'cookie-parser';

// Auth-User service
import user_auth_routes from '@/presentation/routes/auth-user-service/user/auth'
import user_profile_routes from '@/presentation/routes/auth-user-service/user/profile'
import admin_auth_routes from '@/presentation/routes/auth-user-service/admin/auth'
import admin_profile_routes from '@/presentation/routes/auth-user-service/admin/profile'
import { startMetricsServer } from './config/metrics';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(limiter);

// Request logging
app.use((req : Request, res : Response, next : NextFunction)=>{
    logger.debug(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next()
})

// Health check endpoint
app.get('/health', (req : Request, res : Response)=>{
    res.status(200).json({ status : 'OK' });
})

// Route to Auth_user service
app.use('/api/v1/user/auth/', user_auth_routes);
app.use('/api/v1/user/dashboard/', user_profile_routes);
app.use('/api/v1/admin/auth/',admin_auth_routes);
app.use('/api/v1/admin/dashboard/',admin_profile_routes)

// 404 handler
app.use((req : Request, res : Response, next : NextFunction)=>{
    logger.warn(`Resource not found : ${req.method} ${req.url} `)
    res.status(404).json({ message : 'Resource not found' });
})

// Error Handling middleware
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    logger.error('Unhandled error', err);
    res.status(500).json({ message : 'Internal server error' });
})

const startServer = () => {
    try {
        
        app.listen(config.PORT,()=>{
            logger.info(`${config.SERVICE_NAME} running on port ${config.PORT}`);
        })
        startMetricsServer(config.METRICS_PORT)
    } catch (error) {
        logger.error('Failed to start server : ',error);
        process.exit(1);
    }
};

startServer()
