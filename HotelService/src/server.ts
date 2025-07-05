import express from "express";
import { serverConfig } from "./config";
import pingRouter from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import sequelize from "./db/models/sequelize";
import Hotel from "./db/models/hotel";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", pingRouter);

app.use(genericErrorHandler);

app.listen(PORT, async () => {
  logger.info(`Server is 🚀 on ${PORT}`);
  logger.info("Press Ctrl + C to stop the server");
  try {
    await sequelize.authenticate();
    logger.info("Database Connection has been established successfully ");

    // const hotel = await Hotel.create({
    //   name: "Hotel JP Regency",
    //   address: "Mukteshwar",
    //   location: "Nainital",
    //   rating: 4.1,
    // });

    // logger.info("Hotel created Successfully", hotel.toJSON());
    // Fetching the hotels
    const allHotels = await Hotel.findAll();
    logger.info("All hotels", { data: allHotels });
  } catch (err) {
    logger.error("Something went wrong in the db queries");
  }
});
