import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Country } from "../entities/country";

dotenv.config();

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./data/db.sqlite",
  synchronize: true,
  entities: [Country],
  migrations: ["data/*.ts"],
  migrationsTableName: "migrations",
});
