import dotenv from 'dotenv'
dotenv.config();

interface Config {
  SERVICE_NAME: string | undefined;
  PORT: number | undefined;
  DEFAULT_GRPC_TIMEOUT : number | undefined,
  JWT_ACCESS_TOKEN_SECRET : string | undefined;
  JWT_REFRESH_TOKEN_SECRET: string | undefined;
  LOG_LEVEL: string | undefined;
  REDIS_URL: string | undefined;
  GRPC_AUTH_SERVER_URL : string | undefined;
  METRICS_PORT : number | undefined;
  JWT_REFRESH_TOKEN_EXPIRY : string | undefined;
  JWT_ACCESS_TOKEN_EXPIRY : string | undefined;
  GOOGLE_CLIENT_ID : string | undefined;
  CLOUDINARY_CLOUD_NAME : string | undefined;
  CLOUDINARY_API_KEY : string | undefined;
  CLOUDINARY_API_SECRET : string | undefined;
  GRPC_PROBLEM_SERVICE_URL : string | undefined;
}

export const config: Config = {
  SERVICE_NAME: require('../../package.json').name,
  DEFAULT_GRPC_TIMEOUT : Number(process.env.DEFAULT_GRPC_TIMEOUT),
  PORT: Number(process.env.PORT),
  JWT_ACCESS_TOKEN_SECRET : process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET,
  LOG_LEVEL: process.env.LOG_LEVEL,
  REDIS_URL: process.env.REDIS_URL,
  GRPC_AUTH_SERVER_URL : process.env.GRPC_AUTH_SERVER_URL,
  METRICS_PORT : Number(process.env.METRICS_PORT),
  JWT_ACCESS_TOKEN_EXPIRY : process.env.JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY : process.env.JWT_REFRESH_TOKEN_EXPIRY,
  GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
  GRPC_PROBLEM_SERVICE_URL : process.env.GRPC_PROBLEM_SERVICE_URL,
}