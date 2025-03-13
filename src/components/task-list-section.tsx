import { Box, Typography } from "@mui/material";
import { changeTaskStatus, Task, TaskStatus } from "../store/slices/task-slice";
import { TaskList } from "./task-list";
import { getNearestElement } from "../utils/dom";
import { getElements } from "../utils/dom";
import { AddTask } from "./add-task";
import { taskLabels } from "../db/tasks";
import { useAppDispatch } from "../store/hooks";

export const TaskListSection = ({
  status,
  tasks,
}: {
  status: TaskStatus
  tasks: Task[]
}) => {
  const dispatch = useAppDispatch();
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleClearHighlights();
    const elements = getElements(`[data-column="${tasks[0].status}"]`);
    const { element } = getNearestElement(event, elements);
    const task = JSON.parse(event.dataTransfer.getData('task'));
    dispatch(changeTaskStatus({
      id: task.id,
      status: status as TaskStatus,
      beforeId: element.dataset.before
    }));
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleHighlightIndicator(event);
  }

  const handleDragLeave = () => {
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
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Typography variant="h6" marginBottom={2}>{taskLabels[status as TaskStatus]} {tasks.length > 0 && ` (${tasks.length})`}</Typography>
      <TaskList tasks={tasks} />
      <AddTask status={status} />
    </Box>
  )
}