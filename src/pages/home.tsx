import { TaskCreator } from "../components/task-creator"
import { DarkModeToggle } from "../components/dark-mode-toggle"
import { TaskContainer } from "../components/task-container"
import { Box, Container, Grid2, Typography } from "@mui/material"
export const HomePage = () => {
  return (
    <Grid2 
      sx={{
        minHeight: '100vh',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="30vh">
        <Container maxWidth="md">
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%" marginBottom={5}>
            <Typography variant="h1">Tasktify</Typography>
            <DarkModeToggle />
          </Box>
          <TaskCreator />
        </Container>
      </Box>
      <TaskContainer />
    </Grid2>
  )
}