import dotenv from "dotenv";

type ServerConfig = {
  PORT: Number;
};

function loadEnv() {
  dotenv.config();
}
loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
};
