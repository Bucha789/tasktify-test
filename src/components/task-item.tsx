import { DragEvent, useRef, useState } from "react";
import { modify, remove, changeStatus, TaskStatus } from "../store/slices/task-slice";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { motion } from "framer-motion";
import { CustomCheckbox } from "./checkbox";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TaskDropIndicator } from "./task-drop-indicator";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from "../store/hooks";
import { TaskItemOptions } from "./task-item-options";
import { EditTaskForm } from "./edit-task-form";

export type TaskItemProps = {
  description: string
  status: string
  id: string
  allowedStatuses?: TaskStatus[]
}

export const TaskItem = ({ description, status, id, allowedStatuses }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleSaveTask = (description: string) => {
    setIsEditing(false);
    dispatch(modify({
      id,
      description,
      status: status as TaskStatus
    }));
    setOpen(false); 
  }
  const handleDeleteTask = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(remove({
        id
      }));
    }, 300);
  }
  const handleCompleteTask = () => {
    if (status === TaskStatus.COMPLETED) {
      dispatch(changeStatus({
        id,
        status: TaskStatus.TODO
      }));
    } else {
      dispatch(changeStatus({
        id,
        status: TaskStatus.COMPLETED
      }));
    }
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    if (event?.dataTransfer) {
      event.dataTransfer?.setData('task', JSON.stringify({
        id,
        description,
        status
      }));
    }
  }

  const options = [
    {
      label: 'Edit',
      icon: <EditIcon />,
      color: 'primary.main',
      onClick: () => {
        setIsEditing(true);
        setOpen(false);
      }
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      color: 'error.main',
      onClick: handleDeleteTask
    },
    {
      label: 'Complete',
      icon: <CheckIcon />,
      color: 'text.primary',
      onClick: handleCompleteTask
    },
  ]

  const moveOptions = [
    {
      label: 'Move to In Progress',
      icon: <ArrowForwardIcon />,
      color: 'text.primary',
      key: TaskStatus.IN_PROGRESS,
      onClick: () => {
        dispatch(changeStatus({
          id,
          status: TaskStatus.IN_PROGRESS
        }));
      }
    },
    {
      label: 'Move to To Do',
      icon: <ArrowBackIcon />,
      color: 'text.primary',
      key: TaskStatus.TODO,
      onClick: () => {
        dispatch(changeStatus({
          id,
          status: TaskStatus.TODO
        }));
      }
    },
    {
      label: 'Move to Completed',
      icon: <CheckCircleIcon />,
      color: 'text.primary',
      key: TaskStatus.COMPLETED,
      onClick: () => {
        dispatch(changeStatus({
          id,
          status: TaskStatus.COMPLETED
        }));
      }
    }
  ]

  const filteredOptions = moveOptions.filter((option) => {
    if (allowedStatuses) {
      return allowedStatuses.includes(option.key);
    }
    return false;
  });

  return (
    <>
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
          cursor: 'grab',
        }}
        draggable
        component={motion.div}
        onDragStart={(event) => handleDragStart(event as unknown as DragEvent<HTMLDivElement>)}
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
          isEditing ? <EditTaskForm initialState={{ description }} onSubmit={handleSaveTask} /> : <>
            <Box display="flex" alignItems="center" gap={1}>
              <CustomCheckbox
                checked={status === TaskStatus.COMPLETED}
                onChange={handleCompleteTask}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
              <Typography 
                onClick={() => setIsEditing(true)} 
                variant="body1" 
                sx={{ 
                  textDecoration: status === TaskStatus.COMPLETED ? 'line-through' : 'none', 
                  color: status === TaskStatus.COMPLETED ? 'text.disabled' : 'text.primary', 
                  cursor: 'pointer' 
                }}
                aria-label={description}
              >
                {description}
              </Typography>
            </Box>
            <div ref={anchorRef}>
              <IconButton onClick={() => setOpen(true)} color="secondary" aria-label="more options">
                <MoreVertIcon />
              </IconButton>
            </div>
            <TaskItemOptions
              open={open}
              ref={anchorRef}
              onClose={handleClose}
              options={[...filteredOptions, ...options]}
            />
          </>
        }
      </Paper>
      <TaskDropIndicator beforeId={id} column={status} />
    </>
  )
}