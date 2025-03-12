import { Box, Container, Typography } from "@mui/material";
import { changeTaskStatus, Task, TaskStatus } from "../store/slices/task-slice";
import { groupTasksByStatus } from "../utils/group";
import { TaskList } from "./task-list";
import { getNearestElement } from "../utils/dom";
import { useDispatch } from "react-redux";
import { getElements } from "../utils/dom";
import { AddTask } from "./add-task";


const taskLabels = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.COMPLETED]: 'Completed',
}
const statusOrder = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]


const ListSection = ({
  status,
  tasks,
}: {
  status: TaskStatus
  tasks: Task[]
}) => {
  const dispatch = useDispatch();
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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



export const TaskContainerList = ({ tasks }: { tasks: Task[] }) => {
  const groupedTasks = groupTasksByStatus(tasks, statusOrder);

  return (
    <Container maxWidth="md">
      {Object.entries(groupedTasks).map(([status, tasks]) => (<ListSection key={status} status={status as TaskStatus} tasks={tasks} />))}
    </Container>
  )
}