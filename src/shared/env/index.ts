export const env = {
  port: process.env.PORT || '3003',
  security: {
    key: process.env.HASH || 'Haxuuywecusvcuidc2edxvcwdue',
  },
  s3: {},
  redis: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
};
