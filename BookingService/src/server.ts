import express from "express";
import { serverConfig } from "./config/index";
// import pingRouter from "./routes/index";
import { genericErrorHandler } from "./middlewares/error.middleware";
import { attachCorrelationMiddleware } from "./middlewares/correlation.middleware";
import logger from "./config/logger.config";
import v1Router from "./routes/v1/index.router";
import { NotificaitonDto } from "./dto/notification.dto";
import { addEmailToQueue } from "./producers/email.producer";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationMiddleware);

app.use(v1Router);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  logger.info(`Server Running on ${PORT}`);
  logger.info("Press Ctrl + C to stop the server");

  const sampleNotification: NotificaitonDto = {
    to: "sample user",
    subject: "sample test",
    templateId: "testing",
    params: {
      name: "John Doe",
      orderId: "123456",
    },
  };

  for (let i = 1; i < 5; i++) {
    addEmailToQueue(sampleNotification);
  }
});
