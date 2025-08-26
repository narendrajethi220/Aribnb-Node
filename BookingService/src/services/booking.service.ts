import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import { CreateBookingDTO } from "../dto/booking.dto";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { BadRequestError, NotFoundError } from "../utils/app.error";
import prismaClient from "../prisma/client";

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

export async function confirmBookingService(idempotencyKey: string) {
  return await prismaClient.$transaction(async (tx) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(
      tx,
      idempotencyKey
    );
    if (!idempotencyKeyData) {
      throw new NotFoundError("Idempotency Key not found!");
    }
    if (idempotencyKeyData.finalized) {
      throw new BadRequestError("Idempotency Key already finalized");
    }
    const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(tx, idempotencyKey);
    return booking;
  });
}
