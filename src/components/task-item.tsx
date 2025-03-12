import { DragEvent, useRef, useState } from "react";
import { modify, remove, changeTaskStatus, TaskStatus } from "../store/slices/task-slice";
import { useDispatch } from "react-redux";
import { Box, ClickAwayListener, Grow, IconButton, Input, MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { motion } from "framer-motion";
import { CustomCheckbox } from "./checkbox";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DropIndicator } from "./drop-indicator";
export type TaskItemProps = {
  description: string
  status: string
  id: string
}

export const TaskItem = ({ description, status, id }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDescription, setTaskDescription] = useState(description);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
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
    setOpen(false);
    setTimeout(() => {
      dispatch(remove({
        id
      }));
    }, 200);
  }
  const handleCompleteTask = () => {
    dispatch(changeTaskStatus({
      id,
      status: TaskStatus.COMPLETED
    }));
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleMenuItemClick = (_event: React.MouseEvent<HTMLLIElement>, index: number) => {
    switch (index) {
      case 0:
        setIsEditing(true);
        break;
      case 1:
        handleDeleteTask();
        break;
      case 2:
        handleCompleteTask();
        break;
    }
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
    'Edit',
    'Delete',
    'Complete'
  ]

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
        isEditing ? <>
          <Input type="text" value={taskDescription} onChange={handleEditTask} sx={{ width: '100%' }} />
          <IconButton onClick={handleSaveTask} color="secondary">
            <CheckIcon />
          </IconButton>
        </> : <>
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
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
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