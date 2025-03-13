import { Container, } from "@mui/material";
import { TaskListSection } from "./task-list-section";
import { groupTasksByStatus } from "../utils/group";
import { statusOrder } from "../utils/tasks";
import { Task, TaskStatus } from "../store/slices/task-slice";

export const TaskContainerList = ({ tasks }: { tasks: Task[] }) => {
  const groupedTasks = groupTasksByStatus(tasks, statusOrder as TaskStatus[]);

  return (
    <Container maxWidth="md">
      {Object.entries(groupedTasks).map(([status, tasks]) => (<TaskListSection key={status} status={status as TaskStatus} tasks={tasks} />))}
    </Container>
  )
}