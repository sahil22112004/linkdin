// import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { config } from "dotenv"

config();

const datasource :DataSourceOptions & SeederOptions={
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [],
  migrations: ['./src/infrastructure/database/migrations/*.ts'],
  synchronize: false, 
  seeds: [],
}

export const AppDataSource = new DataSource(datasource);