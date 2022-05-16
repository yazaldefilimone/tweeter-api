import { ICacheServices } from '@/data/services/cache/ICacheServices';
import { RedisCache } from '@/shared/redis';

export class CacheServices extends RedisCache implements ICacheServices {}
