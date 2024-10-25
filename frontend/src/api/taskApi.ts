import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createTask = async () => {
  const response = await api.post("/tasks");
  return response.data;
};

export const getTaskStatus = async (taskId: string) => {
  const response = await api.get(`/tasks/${taskId}/status`);
  return response.data;
};

export const getTaskResult = async (taskId: string) => {
  const response = await api.get(`/tasks/${taskId}/result`);
  return response.data;
};
