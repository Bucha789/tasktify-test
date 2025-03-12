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
        <IconButton onClick={() => setView('board')}>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton onClick={() => setView('list')}>
          <ListIcon />
        </IconButton>
      </ButtonGroup>
    )
  }
  const BoardActions = () => {
    return (
      <ButtonGroup>
        <IconButton onClick={() => setView('board')}>
          <SortIcon />
        </IconButton>
        <IconButton onClick={() => setView('list')}>
          <SortByAlphaIcon />
        </IconButton>
      </ButtonGroup>
    )
  }
  return (
    <Box>
      <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
        <Container maxWidth="md">
          <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
            {view === 'board' ? <BoardActions /> : <ListActions />}
            <ButtonGroup>
              <IconButton onClick={() => setView('list')} sx={{ backgroundColor: view === 'list' ? 'primary.main' : 'transparent' }}>
                <TableRowsIcon />
              </IconButton>
              <IconButton onClick={() => setView('board')} sx={{ backgroundColor: view === 'board' ? 'primary.main' : 'transparent' }}>
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