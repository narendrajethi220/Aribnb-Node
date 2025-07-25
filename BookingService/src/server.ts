import express from "express";
import { serverConfig } from "./config/index";
import pingRouter from "./routes/index";
import { genericErrorHandler } from "./middlewares/error.middleware";
import { attachCorrelationMiddleware } from "./middlewares/correlation.middleware";
import logger from "./config/logger.config";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationMiddleware);

app.use(pingRouter);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  logger.info(`Server Running on ${PORT}`);
  logger.info("Press Ctrl + C to stop the server");
});
