import { Box, ButtonGroup, IconButton } from "@mui/material"
import { TaskBoard } from "./task-board"
import { useState } from "react";
import { Container } from "@mui/material"
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import TableRowsIcon from '@mui/icons-material/TableRows';
import TableChartIcon from '@mui/icons-material/TableChart';
import { TaskContainerList } from "./task-container-list";

export const TaskContainer = () => {
  const [view, setView] = useState<'board' | 'list'>('board');
  const tasks = useAppSelector((state: RootState) => state.tasks.addedTasks)

  return (
    <Box marginBottom={4}>
      <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
        <Container maxWidth="md">
          <Box display="flex" flexDirection="row" gap={2} justifyContent="flex-end" marginBottom={2}>
            <ButtonGroup>
              <IconButton onClick={() => setView('list')} sx={{ color: view === 'list' ? 'primary.main' : 'secondary.main' }}>
                <TableRowsIcon />
              </IconButton>
              <IconButton onClick={() => setView('board')} sx={{ color: view === 'board' ? 'primary.main' : 'secondary.main' }}>
                <TableChartIcon />
              </IconButton>
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