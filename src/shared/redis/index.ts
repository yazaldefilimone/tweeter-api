import redis from 'redis';
import { promisify } from 'util';
import { env } from '@/shared/env';

type SetCacheDataParams<T> = {
  key: string;
  data: T;
  time?: number;
};

const client = redis.createClient({
  host: env.redis.host,
  port: Number(env.redis.port),
  connect_timeout: 10000,
  max_attempts: 5,
});

export class RedisCache {
  // cache data remove in 30 seconds
  private readonly cacheTime = 30;

  async getCache<T>(key: string): Promise<T | null> {
    const getAsync = promisify(client.get).bind(client);
    const data = await getAsync(key);

    if (!data) return null;
    return JSON.parse(data) as T;
  }

  async setCache<T>({ data, key, time = this.cacheTime }: SetCacheDataParams<T>): Promise<void> {
    const setexAsync = promisify(client.setex).bind(client);
    await setexAsync(key, time, JSON.stringify(data));
  }

  async removeCache(key: string): Promise<void> {
    client.del(key);
  }
}
