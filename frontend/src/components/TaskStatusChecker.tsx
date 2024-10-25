import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { getTaskStatus } from "../api/taskApi";

const TaskStatusChecker: React.FC = () => {
  const [taskId, setTaskId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleCheckStatus = async () => {
    const data = await getTaskStatus(taskId);
    setStatus(data.status);
  };

  return (
    <div>
      <Typography variant="h5">Check Task Status</Typography>
      <TextField
        label="Task ID"
        variant="outlined"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCheckStatus}
        sx={{ ml: 2 }}
      >
        Check Status
      </Button>
      {status && <Typography mt={2}>Status: {status}</Typography>}
    </div>
  );
};

export default TaskStatusChecker;
