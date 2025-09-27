import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "EMS",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "MyGSTCafe@9088",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
  models: [__dirname + "/../models"], // models folder
});

export default sequelize;
