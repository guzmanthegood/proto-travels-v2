import Redis from "ioredis";

class RedisClient {
  private static instance: RedisClient; // Singleton instance
  private client: Redis;

  private constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      db: Number(process.env.REDIS_DB) || 0,
    });

    // Event listeners
    this.client.on("connect", () => console.log("[Redis] Connected to Redis"));
    this.client.on("error", (err) => console.error("[Redis] Error:", err));
  }

  // Get the singleton instance
  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  // Generic get method
  public async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  // Generic set method with optional expiration
  public async set(
    key: string,
    value: string,
    ttlInSeconds?: number
  ): Promise<void> {
    if (ttlInSeconds) {
      await this.client.set(key, value, "EX", ttlInSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  // Delete a key
  public async delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  // Extend RedisClient to support hash operations
  public async hget(key: string, field: string): Promise<string | null> {
    return this.client.hget(key, field);
  }

  // Generic hset method
  public async hset(
    key: string,
    field: string,
    value: string
  ): Promise<number> {
    return this.client.hset(key, field, value);
  }

  // Generic hdel method
  public async hdel(key: string, field: string): Promise<number> {
    return this.client.hdel(key, field);
  }
  // Generic hgetall method
  public async hgetall(key: string): Promise<Record<string, string>> {
    return this.client.hgetall(key);
  }

  // Set expiration time for a key (in seconds)
  public async expire(key: string, ttlInSeconds: number): Promise<boolean> {
    const result = await this.client.expire(key, ttlInSeconds);
    return result === 1;
  }

  // Close the Redis connection
  public close(): void {
    this.client.quit();
  }
}

export default RedisClient.getInstance();
