import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME|| "EMS",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "MyGSTCafe@9088",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
    port : 5432
  }
);

export default sequelize;
