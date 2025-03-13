import { Box, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { DragEventHandler, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { remove } from "../store/slices/task-slice";
export const DeleteTaskContainer = ({
  direction = 'right'
}: {
  direction?: 'right' | 'left'
}) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
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
        backgroundColor: 'error.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isActive ? 0.5 : 0,
        transition: 'opacity 0.3s ease-in-out',
        border: '2px solid error.dark',
      }}
    >
      <IconButton color='default'>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}