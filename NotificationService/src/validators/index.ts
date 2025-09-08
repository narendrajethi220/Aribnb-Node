import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.config";
import { InvalidBodyRequest } from "../utils/app.error";

export const validateBodyRequest = (schema: AnyZodObject) => {
  //on the go create middleware
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      logger.info("Request Body is Valid");
      next();
    } catch (err) {
      logger.warn("Request Body is Invalid");
      throw new InvalidBodyRequest("Request Body is Invalid");
    }
  };
};
