import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import createHotelDTO from "../dto/hotel.dto";
import { NotFoundError } from "../utils/app.error";

export async function createHotel(hotelData: createHotelDTO) {
  const hotel = await Hotel.create({
    name: hotelData.name,
    address: hotelData.address,
    location: hotelData.location,
    rating: hotelData.rating,
    rating_count: hotelData.rating_count,
  });
  logger.info(`Hotel created :${hotel.id}`);
  return hotel;
}

export async function getHotelById(id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel || hotel.deleted_at != null) {
    logger.info(`Hotel not found :${id}`);
    throw new NotFoundError(`Hote with ${id} not found`);
  }
  logger.info(`Hotel found: ${hotel.id}`);
  return hotel;
}

export async function getAllHotels() {
  const hotels = await Hotel.findAll({
    where: {
      deleted_at: null,
    },
  });
  if (!hotels) {
    logger.info(`No Hotel Found`);
  } else {
    logger.info(`All Hote`);
    return hotels;
  }
}

export async function softDeleteHotel(id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    logger.error(`Hotel not found `);
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }
  hotel.deleted_at = new Date();
  await hotel.save();
  logger.info(`Hotel soft deleted : ${id}`);
  return true;
}

export async function updatedHotelById(newData: createHotelDTO, id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    logger.error(`No Hotel Found with id: ${id}`);
    throw new NotFoundError(`No Hotel Found with id: ${id}`);
  }
  const updatedHotel = await hotel.update(newData);
  logger.info(`Hotel updated: ${updatedHotel.id}`);
  return updatedHotel;
}
