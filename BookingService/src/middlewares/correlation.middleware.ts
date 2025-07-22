import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../utils/request.helper";

export const attachCorrelationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = uuidv4();

  asyncLocalStorage.run({ correlationId: correlationId }, () => {
    next();
  });
};
