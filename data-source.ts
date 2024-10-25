import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
});

if (process.env.NODE_ENV !== "test")
  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to Postgres");
    })
    .catch((error) => console.log(error));
