import Bull, { Job } from "bull";
import { Task } from "./entity/Task";
import { AppDataSource } from "./data-source";

export const taskQueue = new Bull("task-queue", {
  redis: {
    host: process.env.REDIS_HOST ?? "localhost",
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  },
});
const taskRepo = AppDataSource.getRepository(Task);

taskQueue.process(async (job: Job) => {
  // Simulate a long-running task
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const task = await taskRepo.findOne({ where: { id: job.id.toString() } });
  if (task) {
    task.status = "completed";
    task.result = "Task Finished Successfully";
    await taskRepo.save(task);
  }
});
