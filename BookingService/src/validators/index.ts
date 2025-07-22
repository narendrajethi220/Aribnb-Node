import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.config";

export const validateRequestBody = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      logger.info("Request Body is valid");
      next();
    } catch (err) {
      res.status(400).json({
        message: "Invalid request Body",
        success: false,
        error: err,
      });
    }
  };
};
