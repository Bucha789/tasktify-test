import { useSelector } from "react-redux"
import { RootState } from "../store"
import { TaskItem } from "./task-item"
import { Container } from "@mui/material"

export const TaskContainer = () => {
  const tasks = useSelector((state: RootState) => state.tasks.addedTasks)
  return <Container maxWidth="md">
    {tasks.map((task) => (
      <TaskItem key={task.id} {...task} />
    ))}
  </Container>
}