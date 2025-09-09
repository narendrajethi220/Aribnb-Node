import IORedis from "ioredis";
import Redlock from "redlock";
import { serverConfig } from ".";
import logger from "./logger.config";

function connectToRedis() {
  try {
    let connection: IORedis;
    return () => {
      if (!connection) {
        connection = new IORedis(serverConfig.REDIS_SERVER_URL);
        return connection;
      }
      return connection;
    };
  } catch (err) {
    logger.error("Error Connecting Redis", err);
    throw err;
  }
}

export const getConnObj = connectToRedis();

export const redlock = new Redlock([getConnObj()], {
  driftFactor: 0.01,
  retryCount: 10,
  retryDelay: 200,
  retryJitter: 200,
});
