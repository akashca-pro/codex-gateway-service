interface Config {
  SERVICE_NAME: string;
  PORT: number;
  DEFAULT_GRPC_TIMEOUT : number,
  JWT_SECRET : string;
  LOG_LEVEL: string;
  REDIS_URL: string;
  AUTH_SERVICE_URL: string;

}

export const config: Config = {
  SERVICE_NAME: require('../../package.json').name,
  DEFAULT_GRPC_TIMEOUT : Number(process.env.DEFAULT_GRPC_TIMEOUT) || 5000,
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET : process.env.JWT_SECRET || 'jwt_secret',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
};