import { Request, Response } from "express";
import logger from "../config/logger.config";

export const pingHandler = (req: Request, res: Response) => {
  logger.info("Pong From the Ping Controller");
  res.status(200).json({
    success: true,
    message: "pong from ping controller",
  });
};
