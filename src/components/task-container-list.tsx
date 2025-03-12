import { Container, Typography } from "@mui/material";
import { Task, TaskStatus } from "../store/slices/task-slice";
import { groupTasksByStatus } from "../utils/group";
import { TaskList } from "./task-list";
import { Fragment } from "react";
const taskLabels = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.COMPLETED]: 'Completed',
}
const statusOrder = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]
export const TaskContainerList = ({ tasks }: { tasks: Task[] }) => {
  const groupedTasks = groupTasksByStatus(tasks, statusOrder);
  return (
    <Container maxWidth="md">
      {Object.entries(groupedTasks).map(([status, tasks]) => (<Fragment key={status}>
        <Typography variant="h6" marginBottom={2}>{taskLabels[status as TaskStatus]} {tasks.length > 0 && ` (${tasks.length})`}</Typography>
        <TaskList key={status} tasks={tasks} />
      </Fragment>
      ))}
    </Container>
  )
}