import Redis from "ioredis";
import { IRedisProvider, ParamsData } from "../models";

export class RedisProvider implements IRedisProvider {
  private redis: Redis;

  constructor() {
    this.redis = new Redis();
  }

  get client() {
    return this.redis;
  }

  async delete(key: string): Promise<number> {
    return await this.client.del(key);
  }

  setData({ key, value, seconds }: ParamsData) {
    this.redis.set(key, value, "EX", seconds ?? 1000 * 60 * 60 * 24);
  }

  async getData(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  connect() {
    this.redis.connect().catch((error) => {
      console.log("Connect redis ERROR::", error);
    });
  }
}
