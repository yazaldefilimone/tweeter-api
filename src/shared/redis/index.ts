import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';
import { env } from '@/shared/env';

const redis = createClient(env.redis);

type IRedisSet = (key: string, value: string) => Promise<void>;
type IRedisGet = (key: string) => Promise<string | null>;

export const redisSet = function (key: string, value: string) {
  const promiseSet: IRedisSet = promisify(redis.set);
  return promiseSet(key, value);
};

export const redisGet = function (key: string) {
  const promiseGet: IRedisGet = promisify(redis.get);
  return promiseGet(key);
};

export class CacheRedis {
  async set(key: string, value: string): Promise<void> {
    await redisSet(key, value);
  }

  async get(key: string): Promise<string | null> {
    const cache = await redisGet(key);
    return cache;
  }
}
