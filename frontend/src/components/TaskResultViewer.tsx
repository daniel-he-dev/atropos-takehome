import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { getTaskResult } from "../api/taskApi";

const TaskResultViewer: React.FC = () => {
  const [taskId, setTaskId] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleGetResult = async () => {
    const data = await getTaskResult(taskId);
    setResult(data.result || "Task not completed yet");
  };

  return (
    <div>
      <Typography variant="h5">Retrieve Task Result</Typography>
      <TextField
        label="Task ID"
        variant="outlined"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetResult}
        sx={{ ml: 2 }}
      >
        Get Result
      </Button>
      {result && <Typography mt={2}>Result: {result}</Typography>}
    </div>
  );
};

export default TaskResultViewer;
