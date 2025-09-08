import { serverConfig } from ".";
import Redis from "ioredis";
import logger from "./logger.config";

function connectToRedis() {
  try {
    let connection: Redis;
    const redisConfig = {
      port: serverConfig.REDIS_PORT,
      host: serverConfig.REDIS_HOST,
      maxRetriesPerRequest: null,
    };

    return () => {
      if (!connection) {
        connection = new Redis(redisConfig);
        return connection;
      }
      return connection;
    };
  } catch (err) {
    logger.error("Error connecting to Redis:", err);
    throw err;
  }
}

export const getRedisConnObj = connectToRedis();
