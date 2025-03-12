import { Box, Container, Paper, Typography } from "@mui/material"
import { TaskList } from "./task-list"
import { changeTaskStatus, Task } from "../store/slices/task-slice";
import { TaskStatus } from "../store/slices/task-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getElements, getNearestElement } from "../utils/dom";
import { AddTask } from "./add-task";
const BoardSection = ({
  sectionName,
  tasks,
}: {
  sectionName: string
  tasks: Task[]
}) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
    handleClearHighlights();
    const elements = getElements(`[data-column="${tasks[0].status}"]`);
    const { element } = getNearestElement(event, elements);
    const task = JSON.parse(event.dataTransfer.getData('task'));
    dispatch(changeTaskStatus({
      id: task.id,
      status: tasks[0].status as TaskStatus,
      beforeId: element.dataset.before
    }));
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(true);
    handleHighlightIndicator(event);
  }

  const handleDragLeave = () => {
    setActive(false);
    handleClearHighlights();
  }
  const handleClearHighlights = (elements?: HTMLElement[]) => {
    const indicators = elements || getElements(`[data-column="${tasks[0].status}"]`);
    indicators.forEach((element) => {
      element.style.opacity = "0";
      element.style.height = "16px";
    });
  }
  const handleHighlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const elements = getElements(`[data-column="${tasks[0].status}"]`);
    handleClearHighlights(elements);
    const el = getNearestElement(e, elements);
    el.element.style.opacity = "1";
    el.element.style.height = "24px";
  }

  return (
    <Paper
      sx={{
        padding: 2,
        width: '33%',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: '2px solid',
        borderColor: active ? 'primary.main' : 'transparent',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Typography variant="h4" marginBottom={2}>{sectionName}{tasks.length > 0 && ` (${tasks.length})`}</Typography>
      <TaskList tasks={tasks} />
      <AddTask status={tasks[0].status as TaskStatus} />
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
    <Container maxWidth="lg" sx={{ padding: 0 }}>
      <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
        {sections.map((section) => (
          <BoardSection key={section.sectionName} {...section} />
        ))}
      </Box>
    </Container>
  )
}