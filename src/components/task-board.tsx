import { Box, Container, Paper, Typography } from "@mui/material"
import { TaskList } from "./task-list"
import { Task } from "../store/slices/task-slice";
import { TaskStatus } from "../store/slices/task-slice";
const BoardSection = ({
  sectionName,
  tasks,
}: {
  sectionName: string
  tasks: Task[]
}) => {
  return (
    <Paper
      sx={{
        width: '33%',
        padding: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper',

      }}
    >
      <Typography variant="h4" marginBottom={2}>{sectionName}</Typography>
      <TaskList tasks={tasks} />
    </Paper>
  )
}

export type TaskBoardProps = {
  tasks: Task[]
}

export const TaskBoard = ({ tasks }: TaskBoardProps) => {
  const sections = [
    {
      sectionName: 'To Do',
      tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
    },
    {
      sectionName: 'In Progress',
      tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
    },
    {
      sectionName: 'Completed',
      tasks: tasks.filter((task) => task.status === TaskStatus.COMPLETED),
    },
  ]
  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
        {sections.map((section) => (
          <BoardSection key={section.sectionName} {...section} />
        ))}
      </Box>
    </Container>
  )
}