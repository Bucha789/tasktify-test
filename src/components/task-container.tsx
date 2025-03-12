import { useSelector } from "react-redux"
import { RootState } from "../store"
import { TaskItem } from "./task-item"
import { Container, Box } from "@mui/material"
import { AnimatePresence } from "framer-motion"

export const TaskContainer = () => {
  const tasks = useSelector((state: RootState) => state.tasks.addedTasks)
  
  return (
    <Container maxWidth="md">
      <Box sx={{ position: 'relative' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {tasks.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </AnimatePresence>
      </Box>
    </Container>
  )
}