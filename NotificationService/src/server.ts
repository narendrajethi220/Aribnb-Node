import express from "express";
import { serverConfig } from "./config";
import pingRouter from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import { addEmailToQueue } from "./producers/email.producer";
import { setUpMailWorker } from "./processors/email.processor";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", pingRouter);

app.use(genericErrorHandler);

app.listen(PORT, async () => {
  logger.info(`Server is 🚀 on ${PORT}`);
  logger.info("Press Ctrl + C to stop the server");

  setUpMailWorker();
  logger.info("Mailer worker setup completed.");

  addEmailToQueue({
    to: "narendra.jethi2@gmail.com",
    subject: "Request for collaboration of Product",
    templateId: "welcome",
    params: {
      name: "Narendra Jethi",
      appName: "SmartRemainder App",
    },
  });
});
