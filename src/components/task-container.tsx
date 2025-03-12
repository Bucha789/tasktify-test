import { Box, ButtonGroup, IconButton } from "@mui/material"
import { TaskBoard } from "./task-board"
import { useState } from "react";
import { Container } from "@mui/material"
import { TaskList } from "./task-list"
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SortIcon from '@mui/icons-material/Sort';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TableChartIcon from '@mui/icons-material/TableChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListIcon from '@mui/icons-material/List';

export const TaskContainer = () => {
  const [view, setView] = useState<'board' | 'list'>('board');
  const tasks = useSelector((state: RootState) => state.tasks.addedTasks)

  const ListActions = () => {
    return (
      <ButtonGroup>
        <IconButton onClick={() => setView('board')} color="secondary">
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton onClick={() => setView('list')} color="secondary">
          <ListIcon />
        </IconButton>
      </ButtonGroup>
    )
  }
  const BoardActions = () => {
    return (
      <ButtonGroup>
        <IconButton onClick={() => setView('board')} color="secondary">
          <SortIcon />
        </IconButton>
        <IconButton onClick={() => setView('list')} color="secondary">
          <SortByAlphaIcon />
        </IconButton>
      </ButtonGroup>
    )
  }
  return (
    <Box marginBottom={4}>
      <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
        <Container maxWidth="md">
          <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between" marginBottom={2}>
            {view === 'board' ? <BoardActions /> : <ListActions />}
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
        {view === 'board' ? <TaskBoard tasks={tasks} /> : <TaskList tasks={tasks} />}
      </Box>
    </Box>
  )
}