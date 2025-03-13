import { Box, IconButton, useColorScheme } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { DragEventHandler, useState } from "react";
import { motion } from "framer-motion";
import { remove } from "../store/slices/task-slice";
import { useAppDispatch } from "../store/hooks";
export const DeleteTaskContainer = ({
  direction = 'right'
}: {
  direction?: 'right' | 'left'
}) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const { mode } = useColorScheme();
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive(true);
  }
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive(false);
    const task = JSON.parse(e.dataTransfer.getData('task'));
    dispatch(remove({ id: task.id }));
  }
  return (
    <Box
      component={motion.div}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        position: 'absolute',
        top: 0,
        right: direction === 'right' ? 0 : 'auto',
        left: direction === 'left' ? 0 : 'auto',
        zIndex: 1000,
        width: '5%',
        minHeight: '100%',
        borderRadius: 1,
        padding: 1,
        boxShadow: 3,
        backgroundColor: mode === 'dark' ? '#d32f2f80' : '#e5737380', //TODO: Use theme colors instead of hardcoded values
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <IconButton color='error' aria-label="delete task" sx={{
        display: {
          md: 'block',
          xs: 'none',
        },
      }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}