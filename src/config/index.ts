import dotenv from 'dotenv'
dotenv.config();

interface Config {
  SERVICE_NAME: string;
  PORT: number;
  DEFAULT_GRPC_TIMEOUT : number,
  JWT_ACCESS_TOKEN_SECRET : string;
  JWT_REFRESH_TOKEN_SECRET: string;
  LOG_LEVEL: string;
  REDIS_URL: string;
  GRPC_AUTH_SERVER_URL : string;
}

export const config: Config = {
  SERVICE_NAME: require('../../package.json').name,
  DEFAULT_GRPC_TIMEOUT : Number(process.env.DEFAULT_GRPC_TIMEOUT) || 5000,
  PORT: Number(process.env.PORT) || 3000,
  JWT_ACCESS_TOKEN_SECRET : process.env.JWT_ACCESS_TOKEN_SECRET || 'jwt_access_token_secret',
  JWT_REFRESH_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET || 'jwt_refresh_token_secret',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  GRPC_AUTH_SERVER_URL : process.env.GRPC_AUTH_SERVER_URL || 'localhost:50051'
}