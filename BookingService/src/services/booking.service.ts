import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKey,
} from "../repositories/booking.repository";
import { CreateBookingDTO } from "../dto/booking.dto";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { BadRequestError, NotFoundError } from "../utils/app.error";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  const booking = await createBooking({
    userId: createBookingDTO.userId,
    hotelId: createBookingDTO.hotelId,
    totalGuests: createBookingDTO.totalGuests,
    bookingAmount: createBookingDTO.bookingAmount,
  });
  const idempotencyKey = generateIdempotencyKey();

  await createIdempotencyKey(idempotencyKey, booking.id);
  return {
    bookingId: booking.id,
    idempotencyKey: idempotencyKey,
  };
}

export async function finalizeBookingService(idempotencyKey: string) {
  const idempotencyKeyData = await getIdempotencyKey(idempotencyKey);
  if (!idempotencyKeyData) {
    throw new NotFoundError("Idempotency Key not found!");
  }
  if (idempotencyKeyData.finalized) {
    throw new BadRequestError("Idempotency Key already finalized");
  }
  const booking = await confirmBooking(idempotencyKeyData.bookingId);
  await finalizeIdempotencyKey(idempotencyKey);
  return booking;
}
