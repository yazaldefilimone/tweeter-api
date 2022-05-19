import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || '3003',
  security: {
    key: process.env.HASH || '1614a81db056654f4d9a6d9aa3643ae8',
  },
  s3: {},
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  uploads: {
    path: process.env.UPLOAD_PATH as string,
  },
};
