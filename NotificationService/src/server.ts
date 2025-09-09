import express from "express";
import { serverConfig } from "./config";
import pingRouter from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import { setUpMailWorker } from "./processors/email.processor";
import { NotificationDto } from "./dto/notification.dto";
import { addEmailToQueue } from "./producers/email.producer";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", pingRouter);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  logger.info(`Server is 🚀 on ${PORT}`);
  logger.info("Press Ctrl + C to stop the server");

  setUpMailWorker();
  logger.info("Mail Worker setup completed");

  //Adding sample Notification
  // const sampleNotifcation: NotificationDto = {
  //   to: "sampleuser",
  //   subject: "sampleEmail",
  //   templateId: "sample_template",
  //   params: {
  //     name: "John Doe",
  //     orderId: "12345",
  //   },
  // };
  // addEmailToQueue(sampleNotifcation);
});
