import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { getRedisConnObj } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import logger from "../config/logger.config";
import { renderMailTemplate } from "../templates/template.handlers";
import { sendEmail } from "../services/mailer.service";

export const setUpMailWorker = async () => {
  const emailProcessor = new Worker<NotificationDto>(
    MAILER_QUEUE,
    async (job: Job) => {
      const payload = job.data;
      logger.info(`Processing Email for: ${JSON.stringify(payload)}`);
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error("Invalid Job Name");
      }

      const emailContent = await renderMailTemplate(
        payload.templateId,
        payload.params
      );
      await sendEmail(payload.to, payload.subject, emailContent);
      logger.info(
        `Email sent to ${payload.to} with subject ${payload.subject}`
      );
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
