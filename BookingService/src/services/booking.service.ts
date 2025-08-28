import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import { CreateBookingDTO } from "../dto/booking.dto";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/app.error";
import prismaClient from "../prisma/client";
import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  const ttl = serverConfig.LOCK_TTL;
  const bookingResources = `hotel:${createBookingDTO.hotelId}`;
  try {
    await redlock.acquire([bookingResources], ttl);
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
  } catch (err) {
    throw new InternalServerError(
      "Failed to acquire lock for booking resources"
    );
  }
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
