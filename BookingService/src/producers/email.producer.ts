import { mailerQueue } from "../queues/mailer.queue";
import { NotificaitonDto } from "../dto/notification.dto";
import logger from "../config/logger.config";

export const MAILER_PAYLOAD = "payload_mail";

export const addEmailToQueue = async (payload: NotificaitonDto) => {
  await mailerQueue.add(MAILER_PAYLOAD, payload);
  logger.info(`Email Added to Queue: ${JSON.stringify(payload)}`);
};
