import { createClient} from "redis";

class RedisUtil{
  private static client: any;

  private static async getClient() {
    if (!this.client) {
      this.client = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
      });

      this.client.on("error", (err) => console.error("Redis Error:", err));
      await this.client.connect();
    }
    return this.client;
  }

  public static async setCache(key: string, value: string, ttlSeconds?: number) {
    const client = await this.getClient();
    if (ttlSeconds) {
      await client.set(key, value, { EX: ttlSeconds });
    } else {
      await client.set(key, value);
    }
  }

  public static async getCache(key: string) {
    const client = await this.getClient();
    return client.get(key);
  }


  public static async delCache(key: string) {
    const client = await this.getClient();
    return client.del(key);
  }
}

export default RedisUtil;
