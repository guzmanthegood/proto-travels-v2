import Redis from "ioredis";

// Load Redis configuration from environment variables
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1", // Redis host (default: localhost)
  port: Number(process.env.REDIS_PORT) || 6379, // Redis port (default: 6379)
  password: process.env.REDIS_PASSWORD || undefined, // Redis password, if any
  db: Number(process.env.REDIS_DB) || 0, // Redis database index (default: 0)
});

// Event listeners for Redis connection
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err: any) => {
  console.error("Redis error:", err);
});

export default redisClient;
