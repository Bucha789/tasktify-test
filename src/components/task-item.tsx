import { useState } from "react";
import { modify, remove, changeTaskStatus, TaskStatus } from "../store/slices/task-slice";
import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { motion } from "framer-motion";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export type TaskItemProps = {
  description: string
  status: string
  id: string
}

export const TaskItem = ({ description, status, id }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDescription, setTaskDescription] = useState(description);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleEditTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  }
  const handleSaveTask = () => {
    setIsEditing(false);
    dispatch(modify({
      id,
      description: taskDescription
    }));
  }
  const handleDeleteTask = () => {
    dispatch(remove({
      id
    }));
    setOpen(false);
  }
  const handleCompleteTask = () => {
    dispatch(changeTaskStatus({
      id,
      status: TaskStatus.COMPLETED
    }));
  }
  const handleInProgressTask = () => {
    dispatch(changeTaskStatus({
      id,
      status: TaskStatus.IN_PROGRESS
    }));
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 2,
      }}
      component={motion.div}
      layout
      layoutId={id}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        bounce: 0.2,
        layout: { type: 'spring', bounce: 0.2 }
      }}
      key={id}
    >
      {
        isEditing ? <>
          <Input type="text" value={taskDescription} onChange={handleEditTask} sx={{ width: '100%' }} />
          <IconButton onClick={handleSaveTask}>
            <SaveIcon />
          </IconButton>
        </> : <>
          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox
              checked={status === TaskStatus.COMPLETED}
              onChange={handleCompleteTask}
              sx={{
                color: 'primary.main',
                '&.Mui-checked': {
                  color: 'primary.main',
                },
              }}
            />
            <Typography onClick={() => setIsEditing(true)} variant="body1">{description}</Typography>
          </Box>
          <ButtonGroup>
            <IconButton onClick={() => setOpen(true)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleInProgressTask}>
              <PlayArrowIcon />
            </IconButton>
          </ButtonGroup>
        </>
      }
      <Dialog 
        open={open} 
        onClose={handleClose}
      >
        <Box
        >
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeleteTask}>Delete</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Paper>
  )
}