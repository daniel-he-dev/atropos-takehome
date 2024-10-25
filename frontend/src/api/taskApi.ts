import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createTask = async () => {
  try {
    const response = await api.post("/tasks");
    return response.data as { id: string };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTaskStatus = async (taskId: string) => {
  try {
    const response = await api.get(`/tasks/${taskId}/status`);
    return response.data as { id: string; status: string };
  } catch (error) {
    console.error(error);
    return { id: taskId, status: "Task Not Found" };
  }
};

export const getTaskResult = async (taskId: string) => {
  try {
    const response = await api.get(`/tasks/${taskId}/result`);
    return response.data as { id: string; result: string };
  } catch (error) {
    console.error(error);
    return { id: taskId, result: "Task Not Found" };
  }
};
