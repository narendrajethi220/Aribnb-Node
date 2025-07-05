import express from "express";
import { serverConfig } from "./config";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import v1Router from "./routers/v1/index.router";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", v1Router);

app.use(genericErrorHandler);

app.listen(PORT, async () => {
  logger.info(`Server is 🚀 on ${PORT}`);
  logger.info("Press Ctrl + C to stop the server");
});
