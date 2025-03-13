import { DragEvent, useRef, useState } from "react";
import { modify, remove, changeTaskStatus, TaskStatus } from "../store/slices/task-slice";
import { Box, ClickAwayListener, Grow, IconButton, Input, MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { motion } from "framer-motion";
import { CustomCheckbox } from "./checkbox";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DropIndicator } from "./drop-indicator";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from "../store/hooks";

export type TaskItemProps = {
  description: string
  status: string
  id: string
  allowedStatuses?: TaskStatus[]
}

export const TaskItem = ({ description, status, id, allowedStatuses }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDescription, setTaskDescription] = useState(description);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const handleEditTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  }
  const handleSaveTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch(modify({
      id,
      description: taskDescription
    }));
  }
  const handleDeleteTask = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(remove({
        id
      }));
    }, 200);
  }
  const handleCompleteTask = () => {
    if (status === TaskStatus.COMPLETED) {
      dispatch(changeTaskStatus({
        id,
        status: TaskStatus.TODO
      }));
    } else {
      dispatch(changeTaskStatus({
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
        dispatch(changeTaskStatus({
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
        dispatch(changeTaskStatus({
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
        dispatch(changeTaskStatus({
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
          isEditing ? <form onSubmit={handleSaveTask} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Input type="text" value={taskDescription} autoFocus onChange={handleEditTask} sx={{ width: '100%' }} />
            <IconButton type="submit" color="secondary">
              <CheckIcon />
            </IconButton>
          </form> : <>
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
              <Typography onClick={() => setIsEditing(true)} variant="body1" sx={{ textDecoration: status === TaskStatus.COMPLETED ? 'line-through' : 'none', color: status === TaskStatus.COMPLETED ? 'text.disabled' : 'text.primary', cursor: 'pointer' }}>{description}</Typography>
            </Box>
            <div ref={anchorRef}>
              <IconButton onClick={() => setOpen(true)} color="secondary">
                <MoreVertIcon />
              </IconButton>
            </div>
            <Popper
              sx={{ zIndex: 1 }}
              open={open}
              role={undefined}
              transition
              disablePortal
              anchorEl={anchorRef.current}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        {[...filteredOptions, ...options].map((option) => (
                          <MenuItem
                            key={option.label}
                            onClick={option.onClick}
                            sx={{
                              color: option.color,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}
                          >
                            {option.icon}
                            {option.label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        }
      </Paper>
      <DropIndicator beforeId={id} column={status} />
    </>
  )
}