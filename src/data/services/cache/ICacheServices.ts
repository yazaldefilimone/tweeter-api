export interface ICacheServices {
  getCache<T>(key: string): Promise<T | null>;
  setCache<T>(data: ICacheServices.InputSetCache<T>): Promise<void>;
  removeCache(key: string): Promise<void>;
}
export namespace ICacheServices {
  export type InputSetCache<T> = {
    key: string;
    data: T;
    time?: number;
  };
}
