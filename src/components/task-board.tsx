import { Box, Container, Paper, Typography } from "@mui/material"
import { TaskList } from "./task-list"
import { changeTaskStatus, Task } from "../store/slices/task-slice";
import { TaskStatus } from "../store/slices/task-slice";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { getElements, getNearestElement } from "../utils/dom";
import { AddTask } from "./add-task";
import { taskLabels } from "../db/tasks";
import { useAppDispatch } from "../store/hooks";

const BoardSection = ({
  sectionKey,
  tasks,
  isMoving,
  setIsMoving
}: {
  sectionKey: TaskStatus
  tasks: Task[]
  isMoving: boolean
  setIsMoving: Dispatch<SetStateAction<boolean>>
}) => {
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
    handleClearHighlights();
    const elements = getElements(`[data-column="${tasks[0].status}"]`);
    const { element } = getNearestElement(event, elements);
    const task = JSON.parse(event.dataTransfer.getData('task'));
    dispatch(changeTaskStatus({
      id: task.id,
      status: sectionKey,
      beforeId: element.dataset.before,
    }));
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();     
    console.log(event.clientX);
    setActive(true);
    handleHighlightIndicator(event);
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      console.log(containerRect.left, containerRect.right);
      const scrollThreshold = 50; // Píxeles desde el borde donde comenzará el scroll
      if (event.clientX < containerRect.left + scrollThreshold && !isMoving) {
        setIsMoving(() => true);
        container.parentElement?.scrollBy({
          left: -1,
          behavior: 'smooth'
        });
      }
      if (event.clientX > containerRect.right - scrollThreshold && !isMoving) {
        setIsMoving(() => true);
        container.parentElement?.scrollBy({
          left: 1,
          behavior: 'smooth'
        });
      }
    }   
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


  useEffect(() => {
    if (isMoving) {
      setTimeout(() => {
        setIsMoving(() => false);
      }, 2000);
    }
  }, [isMoving, setIsMoving]);

  return (
    <Paper
      sx={{
        padding: 2,
        width: { xs: '350px', md: '33%' },
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: '2px solid',
        borderColor: active ? 'primary.main' : 'transparent',
        scrollSnapAlign: 'start',
        position: 'relative',
        flexShrink: {
          xs: 0,
          md: 1,
        },
      }}
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Typography variant="h4" marginBottom={2}>{taskLabels[sectionKey]}{tasks.length > 0 && ` (${tasks.length})`}</Typography>
      <TaskList tasks={tasks} />
      <AddTask status={sectionKey} />
    </Paper>
  )
}

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
          <BoardSection key={section.sectionKey} isMoving={isMoving} setIsMoving={setIsMoving} {...section} />
        ))}
      </Box>
    </Container>
  )
}