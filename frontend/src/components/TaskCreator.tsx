import React, { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import { createTask } from "../api/taskApi";

const TaskCreator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  const handleCreateTask = async () => {
    setLoading(true);
    const task = await createTask();
    if (task) setTaskId(task.taskId);
    setLoading(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Create a New Task</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTask}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create Task"}
        </Button>
      </div>
      {taskId && (
        <Typography color="success.main" mt={2}>
          Task Created! ID: {taskId}
        </Typography>
      )}
    </div>
  );
};

export default TaskCreator;
