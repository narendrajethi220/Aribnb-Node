import express from "express";
import { validateRequestBody } from "../../validators";
import { bookingSchema } from "../../validators/booking.validator";
import {
  createBookingHandler,
  finalizeBookingHandler,
} from "../../controllers/booking.controller";

export const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  validateRequestBody(bookingSchema),
  createBookingHandler
);
bookingRouter.post("/confirm/:idempotencyKey", finalizeBookingHandler);
