import express from "express";
import { pingHandler } from "../../controllers/ping.controller";
import { validateBodyRequest } from "../../validators";
import { pingSchema } from "../../validators/ping.validator";
import logger from "../../config/logger.config";

const pingRouter = express.Router();

pingRouter.post(
  "/ping",
  (req, res, next) => {
    logger.info("post /ping router Hit");
    next();
  },
  validateBodyRequest(pingSchema),
  pingHandler
);

export default pingRouter;
