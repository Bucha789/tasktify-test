import { TaskCreator } from "../components/task-creator"
import { DarkModeToggle } from "../components/dark-mode-toggle"
import { TaskContainer } from "../components/task-container"
import { Box } from "@mui/material"
export const HomePage = () => {
  return (
    <Box>
      <main>
        <DarkModeToggle />
        <TaskCreator />
      </main>
      <TaskContainer />
    </Box>
  )
}