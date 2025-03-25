import { Box, IconButton, MenuItem, Pagination, Select, SelectChangeEvent, Typography } from "@mui/material";
import { changeStatus, TaskStatus } from "../store/slices/task-slice";
import { TaskList } from "./task-list";
import { getNearestElement } from "../utils/dom";
import { getElements } from "../utils/dom";
import { AddTask } from "./add-task";
import { taskLabels } from "../db/tasks";
import { useAppDispatch } from "../store/hooks";
import { usePaginationTasks } from "../hooks/use-pagination-tasks";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useState } from "react";
import { Task } from "../store/slices/task-slice";

export const TaskListSection = ({
  status,
  tasks,
}: {
  status: TaskStatus
  tasks: Task[]
}) => {
  const dispatch = useAppDispatch();
  const [rowsLength, setRowsLength] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { allTasks, currentTasks } = usePaginationTasks(currentPage, rowsLength, tasks);
  console.log(allTasks, currentTasks);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    setRowsLength(Number(event.target.value as string));
  }
  
  const goToLastPage = () => {
    setCurrentPage(Object.keys(allTasks).length);
  }

  const goToFirstPage = () => {
    setCurrentPage(1);
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleClearHighlights();
    const elements = getElements(`[data-column="${status}"]`);
    const { element } = getNearestElement(event, elements);
    const task = JSON.parse(event.dataTransfer.getData('task'));
    dispatch(changeStatus({
      id: task.id,
      status: status as TaskStatus,
      beforeId: element?.dataset?.before
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
    const indicators = elements || getElements(`[data-column="${status}"]`);
    indicators.forEach((element) => {
      element.style.opacity = "0";
      element.style.height = "16px";
    });
  }
  const handleHighlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const elements = getElements(`[data-column="${status}"]`);
    handleClearHighlights(elements);
    const el = getNearestElement(e, elements);
    if (el.element) {
      el.element.style.opacity = "1";
      el.element.style.height = "24px";
    }
  }
  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Typography variant="h2" marginBottom={2}>{taskLabels[status as TaskStatus]} {currentTasks.length > 0 && ` (${currentTasks.length})`}</Typography>
      <TaskList tasks={currentTasks} />
      <AddTask status={status} />
      <div>
        <Select
          value={rowsLength.toString()}
          label="Page Count"
          onChange={handleSelectChange}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        <Pagination count={Object.keys(allTasks).length} page={currentPage} onChange={handleChange}/>
        <IconButton onClick={goToFirstPage}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={goToLastPage}>
          <LastPageIcon />
        </IconButton>
      </div>
    </Box>
  )
}