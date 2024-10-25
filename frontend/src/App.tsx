import { Container, Typography, Paper } from "@mui/material";
import TaskCreator from "./components/TaskCreator";
import TaskStatusChecker from "./components/TaskStatusChecker";
import TaskResultViewer from "./components/TaskResultViewer";

function App() {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Atropos Task Manager
        </Typography>
        <TaskCreator />
        <TaskStatusChecker />
        <TaskResultViewer />
      </Paper>
    </Container>
  );
}

export default App;
