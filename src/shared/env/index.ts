export const env = {
  port: process.env.PORT || '3003',
  security: {
    key: process.env.HASH || '1614a81db056654f4d9a6d9aa3643ae8',
  },
  s3: {},
  redis: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
  uploads: {
    path: process.env.UPLOAD_PATH,
  },
};
