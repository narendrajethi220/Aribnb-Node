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
  if (!hotel) {
    logger.info(`Hotel not found :${id}`);
    throw new NotFoundError(`Hote with ${id} not found`);
  }
  logger.info(`Hotel found: ${hotel.id}`);
  return hotel;
}

export async function getAllHotels() {
  const hotels = await Hotel.findAll();
  if (!hotels) {
    logger.info(`No Hotel Found`);
  } else {
    logger.info(`All Hotels`);
    return hotels;
  }
}

export async function deleteHotelById(id: number) {
  const deleteCount = await Hotel.destroy({
    where: {
      id: id,
    },
  });
  if (deleteCount > 0) {
    logger.info(`Successfully deleted ${deleteCount} record(s) with id: ${id}`);
  } else {
    logger.error(`No Hotel Found with id: ${id}`);
    throw new NotFoundError(`No Hotel Found with id: ${id}`);
  }
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
