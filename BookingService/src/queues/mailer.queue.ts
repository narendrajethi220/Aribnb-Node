import { Queue } from "bullmq";
import { getConnObj } from "../config/redis.config";

export const MAILER_QUEUE = "queue_mailer";
export const mailerQueue = new Queue(MAILER_QUEUE, {
  connection: getConnObj(),
});
