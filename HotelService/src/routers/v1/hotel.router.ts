import express from "express";
import { validateBodyRequest } from "../../validators";
import { hotelSchema } from "../../validators/hotels.validator";
import {
  createHotelHandler,
  deleteHotelHandler,
  getAllHotelsHandler,
  getHotelByIdHandler,
  updateHotelHandler,
} from "../../controllers/hotel.controller";

const hotelRouter = express.Router();

hotelRouter.post("/", validateBodyRequest(hotelSchema), createHotelHandler);
hotelRouter.get("/:id", getHotelByIdHandler);
hotelRouter.get("/", getAllHotelsHandler);
hotelRouter.put("/:id", validateBodyRequest(hotelSchema), updateHotelHandler);
hotelRouter.delete("/:id", deleteHotelHandler);

export default hotelRouter;
