import createHotelDTO from "../dto/hotel.dto";
import {
  createHotel,
  getHotelById,
  getAllHotels,
  updatedHotelById,
  softDeleteHotel,
} from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}

export async function getAllHotelsService() {
  const hotels = await getAllHotels();
  return hotels;
}

export async function delteHotelService(id: number) {
  await softDeleteHotel(id);
}

export async function updateHotelService(newData: createHotelDTO, id: number) {
  const updatedHotel = await updatedHotelById(newData, id);
  return updatedHotel;
}
