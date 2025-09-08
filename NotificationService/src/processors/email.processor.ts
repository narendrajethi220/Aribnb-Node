import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { getRedisConnObj } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import logger from "../config/logger.config";

export const setUpMailWorker = () => {
  const emailProcessor = new Worker<NotificationDto>(
    MAILER_QUEUE,
    async (job: Job) => {
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error("Invalid Job Name");
      }
    },
    {
      connection: getRedisConnObj(),
    }
  );
  emailProcessor.on("failed", () => {
    logger.error("Email processing failed");
  });
  emailProcessor.on("completed", () => {
    logger.info("Email Processing Completed sucecssfully");
  });
};
