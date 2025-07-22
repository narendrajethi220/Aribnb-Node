import express from "express";
import { validateRequestBody } from "../../validators";
import { pingSchema } from "../../validators/ping.validator";
import {
  pingHandler,
  pingReplyHandler,
} from "../../controllers/ping.controller";

const v1Router = express.Router();

v1Router.post("/ping", validateRequestBody(pingSchema), pingHandler);
v1Router.get("/ping", pingReplyHandler);

export default v1Router;
