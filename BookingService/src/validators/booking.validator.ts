import { z } from "zod";

export const bookingSchema = z.object({
  userId: z.number({ message: "UserId must be present" }),
  hotelId: z.number({ message: "HotelId must be present" }),
  totalGuests: z
    .number({ message: "Total guests must be present" })
    .min(1, { message: "Total Guest must be atleast 1" }),
  bookingAmount: z
    .number({ message: "Booking amount must be present" })
    .min(1, { message: "Booking amount must be greater than 1" }),
});
