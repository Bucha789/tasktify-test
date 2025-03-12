import { useState } from "react";
import { modify, remove, changeTaskStatus } from "../store/slices/task-slice";
import { useDispatch } from "react-redux";
import { Box, Checkbox, IconButton, Input, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
export type TaskItemProps = {
  description: string
  completed: boolean
  id: string
}

export const TaskItem = ({ description, completed, id }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [taskDescription, setTaskDescription] = useState(description);
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
  }
  const handleCompleteTask = () => {
    dispatch(changeTaskStatus({
      id,
    }));
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
              checked={completed}
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
          <IconButton onClick={handleDeleteTask}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    </Paper>
  )
}