import { Box, ButtonGroup } from "@mui/material"
import { TaskBoard } from "./task-board"
import { useState } from "react";
import { Container } from "@mui/material"
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import TableRowsIcon from '@mui/icons-material/TableRows';
import TableChartIcon from '@mui/icons-material/TableChart';
import { TaskContainerList } from "./task-container-list";
import { TaskViewButton } from "./task-view-button";

export const TaskContainer = () => {
  const [view, setView] = useState<'board' | 'list'>('list');
  const tasks = useAppSelector((state: RootState) => state.tasks.addedTasks)

  return (
    <Box marginBottom={4}>
      <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
        <Container maxWidth="md">
          <Box display="flex" flexDirection="row" gap={2} justifyContent="flex-end" marginBottom={2}>
            <ButtonGroup>
              <TaskViewButton active={view === 'board'} onClick={() => setView('board')} icon={<TableChartIcon />} ariaLabel="board view" />
              <TaskViewButton active={view === 'list'} onClick={() => setView('list')} icon={<TableRowsIcon />} ariaLabel="list view" />
            </ButtonGroup>
          </Box>
        </Container>
      </Box>
      <Box sx={{ position: 'relative' }}>
        {view === 'board' ? <TaskBoard tasks={tasks} /> : <TaskContainerList tasks={tasks} />}
      </Box>
    </Box>
  )
}