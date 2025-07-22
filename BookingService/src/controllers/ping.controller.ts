import { Request, Response } from "express";

export const pingHandler = (req: Request, res: Response) => {
  res.json("Pong");
};

export const pingReplyHandler = (req: Request, res: Response) => {
  res.json("Pong");
};
