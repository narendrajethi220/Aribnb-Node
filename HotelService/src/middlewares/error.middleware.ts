import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app.error";
import logger from "../config/logger.config";

export const genericErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error occurred", { error: err.message });
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
