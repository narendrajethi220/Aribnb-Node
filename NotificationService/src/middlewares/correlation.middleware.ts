import { Request, Response, NextFunction } from "express";
import { v4 as uuidV4 } from "uuid";
import { asyncLocalStorage } from "../utils/request.helper";

export const attachCorrelationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = uuidV4();

  asyncLocalStorage.run({ correlatioId: correlationId }, () => {
    next();
  });
};
