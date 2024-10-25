import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "atropos_task_service",
  password: "geneva",
  database: "atropos_tasks",
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
});

if (process.env.NODE_ENV !== "test")
  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to Postgres");
    })
    .catch((error) => console.log(error));
