import { Container, Typography } from "@mui/material";
import { Task, TaskStatus } from "../store/slices/task-slice";
import { groupTasksByStatus } from "../utils/group";
import { TaskList } from "./task-list";

const taskLabels = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.COMPLETED]: 'Completed',
}
const statusOrder = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]
export const TaskContainerList = ({ tasks }: { tasks: Task[] }) => {
  const groupedTasks = groupTasksByStatus(tasks, statusOrder);
  console.log(groupedTasks)
  return (
    <Container maxWidth="md">
      {Object.entries(groupedTasks).map(([status, tasks]) => (<>
        <Typography variant="h6" marginBottom={2}>{taskLabels[status as TaskStatus]} {tasks.length > 0 && ` (${tasks.length})`}</Typography>
        <TaskList key={status} tasks={tasks} />
      </>
      ))}
    </Container>
  )
}