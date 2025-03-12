import { TaskItem } from "./task-item"
import { AnimatePresence } from "framer-motion"
import { Task } from "../store/slices/task-slice"
import { Container } from "@mui/material"

export type TaskListProps = {
  tasks: Task[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <Container maxWidth="md">
      <AnimatePresence mode="popLayout" initial={false}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            {...task}
          />
        ))}
      </AnimatePresence>
    </Container>
  )
}