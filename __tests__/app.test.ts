const mockTask = { id: "1" };
const taskRepo = {
  create: jest.fn().mockReturnValue(mockTask),
  save: jest.fn().mockResolvedValue(mockTask),
  findOne: jest.fn().mockResolvedValue(mockTask),
};

import request from "supertest";
import { app } from "../app";
import { taskQueue } from "../queue";

jest.mock("../queue", () => ({
  taskQueue: {
    add: jest.fn().mockResolvedValue(mockTask),
  },
}));

jest.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue(taskRepo),
  },
}));

describe("Task API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new task", async () => {
    const response = await request(app).post("/tasks").send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ taskId: "1" });
    expect(taskQueue.add).toHaveBeenCalled();
    expect(taskRepo.create).toHaveBeenCalledWith({
      id: "1",
      status: "pending",
    });
    expect(taskRepo.save).toHaveBeenCalledWith(mockTask);
  });

  it("should get task status", async () => {
    const mockTask = { id: "1", status: "pending" };
    taskRepo.findOne.mockResolvedValue(mockTask);

    const response = await request(app).get("/tasks/1/status");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ taskId: "1", status: "pending" });
    expect(taskRepo.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("should return 404 if task not found for status", async () => {
    taskRepo.findOne.mockResolvedValue(null);

    const response = await request(app).get("/tasks/1/status");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Task not found" });
  });

  it("should get task result", async () => {
    const mockTask = { id: "1", status: "completed", result: "result" };
    taskRepo.findOne.mockResolvedValue(mockTask);

    const response = await request(app).get("/tasks/1/result");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ taskId: "1", result: "result" });
    expect(taskRepo.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("should return 404 if task not found for result", async () => {
    taskRepo.findOne.mockResolvedValue(null);

    const response = await request(app).get("/tasks/1/result");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Task not found" });
  });

  it("should return 404 if task not completed yet", async () => {
    const mockTask = { id: "1", status: "pending" };
    taskRepo.findOne.mockResolvedValue(mockTask);

    const response = await request(app).get("/tasks/1/result");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Task not completed yet" });
  });
});
