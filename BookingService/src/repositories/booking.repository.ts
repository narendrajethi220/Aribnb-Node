import { IdempotencyKey, Prisma } from "@prisma/client";

import prismaClient from "../prisma/client";
import { validate as isValidUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/app.error";

export async function createIdempotencyKey(key: string, bookingId: number) {
  const idempotencyKey = await prismaClient.idempotencyKey.create({
    data: {
      idemKey: key,
      booking: {
        connect: {
          id: bookingId,
        },
      },
    },
  });
  return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(
  tx: Prisma.TransactionClient,
  key: string
) {
  if (!isValidUUID(key)) {
    throw new BadRequestError("Invalid Idempotency Key Format");
  }

  const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
    Prisma.raw(`
      SELECT * FROM IdempotencyKey WHERE idemKey = '${key}' FOR UPDATE;`)
  );

  if (!idempotencyKey || idempotencyKey.length === 0) {
    throw new NotFoundError("Idempotency Key Not Found!");
  }

  return idempotencyKey[0];
}

export async function getBookingId(bookingId: number) {
  const booking = await prismaClient.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
  return booking;
}

export async function confirmBooking(
  tx: Prisma.TransactionClient,
  bookingId: number
) {
  const booking = await tx.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CONFIRMED",
    },
  });
  return booking;
}

export async function cancelledBooking(bookingId: number) {
  const booking = await prismaClient.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  return booking;
}

export async function finalizeIdempotencyKey(
  tx: Prisma.TransactionClient,
  key: string
) {
  const idempotencyKey = await tx.idempotencyKey.update({
    where: {
      idemKey: key,
    },
    data: {
      finalized: true,
    },
  });
  return idempotencyKey;
}

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {
  const booking = await prismaClient.booking.create({
    data: bookingInput,
  });
  return booking;
}
