import express from "express";
import { pingHandler } from "../../controllers/ping.controller";
import hotelRouter from "./hotel.router";

const v1Router = express.Router();

v1Router.use("/ping", pingHandler);
v1Router.use("/hotel", hotelRouter);

export default v1Router;
