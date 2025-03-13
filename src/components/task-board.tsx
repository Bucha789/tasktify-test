import { Box, Container } from "@mui/material"
import { Task } from "../store/slices/task-slice";
import { TaskStatus } from "../store/slices/task-slice";
import { useState } from "react";
import { TaskBoardSection } from "./task-board-section";


export type TaskBoardProps = {
  tasks: Task[]
}

export const TaskBoard = ({ tasks }: TaskBoardProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const sections = [
    {
      sectionKey: TaskStatus.TODO,
      tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
    },
    {
      sectionKey: TaskStatus.IN_PROGRESS,
      tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
    },
    {
      sectionKey: TaskStatus.COMPLETED,
      tasks: tasks.filter((task) => task.status === TaskStatus.COMPLETED),
    },
  ]
  return (
    <Container maxWidth="lg" sx={{ padding: 0 }}>
      <Box 
        display="flex" 
        id="task-board"
        flexDirection="row" 
        gap={2} 
        width={{
          xs: '350px',
          md: '100%',
          lg: '100%',
        }}
        marginX="auto"
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          flexShrink: 0,
        }}
      >
        {sections.map((section) => (
          <TaskBoardSection key={section.sectionKey} isMoving={isMoving} setIsMoving={setIsMoving} {...section} />
        ))}
      </Box>
    </Container>
  )
}