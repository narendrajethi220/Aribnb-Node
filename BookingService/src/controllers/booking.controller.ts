import { Request, Response, NextFunction } from "express";
import {
  createBookingService,
  confirmBookingService,
} from "../services/booking.service";

export const createBookingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const booking = await createBookingService(req.body);
  res.status(201).json({
    bookingId: booking.bookingId,
    idempotencyKey: booking.idempotencyKey,
  });
};

export const finalizeBookingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const booking = await confirmBookingService(req.params.idempotencyKey);
  res.status(200).json({
    bookingId: booking.id,
    status: booking.status,
  });
};
