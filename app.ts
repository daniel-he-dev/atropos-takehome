import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { Task } from "./entity/Task";
import { taskQueue } from "./queue";
import { AppDataSource } from "./data-source";

export const app = express();
const taskRepo = AppDataSource.getRepository(Task);

app.use(cors());
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.post("/tasks", (req: Request, res: Response) => {
  taskQueue
    .add({})
    .then((task) => {
      const newTask = taskRepo.create({
        id: task.id.toString(),
        status: "pending",
      });
      return taskRepo.save(newTask);
    })
    .then((newTask) => {
      res.json({ taskId: newTask.id });
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

app.get("/tasks/:taskId/status", (req: Request, res: Response) => {
  taskRepo.findOne({ where: { id: req.params.taskId } }).then((task) => {
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ taskId: task.id, status: task.status });
  });
});

app.get("/tasks/:taskId/result", (req: Request, res: Response) => {
  taskRepo.findOne({ where: { id: req.params.taskId } }).then((task) => {
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.status !== "completed")
      return res.status(404).json({ message: "Task not completed yet" });
    res.json({ taskId: task.id, result: task.result });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist", "index.html"));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server running on http://localhost:${process.env.PORT || 3000}`
    );
  });
}
