import { Request, Response, NextFunction } from "express";
import {
  createHotelService,
  delteHotelService,
  getAllHotelsService,
  getHotelByIdService,
  updateHotelService,
} from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export async function createHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotelResponse = await createHotelService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Hotel created Successfully",
    data: hotelResponse,
  });
}

export async function getHotelByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotelResponse = await getHotelByIdService(Number(req.params.id));

  res.status(StatusCodes.OK).json({
    success: false,
    message: "Hotel Found Successfully",
    data: hotelResponse,
  });
}

export async function getAllHotelsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotelsResponse = await getAllHotelsService();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotels fetched Successfully",
    data: hotelsResponse,
  });
}

export async function deleteHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await delteHotelService(Number(req.params.id));
  res.status(StatusCodes.OK).json({
    success: true,
    // message: "Successfully deleted",
  });
}

export async function updateHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const updatedResponse = await updateHotelService(
    req.body,
    Number(req.params.id)
  );
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotel Updated Successfully",
    data: updatedResponse,
  });
}
