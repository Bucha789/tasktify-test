import { FormEvent } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { create, TaskStatus } from "../store/slices/task-slice";
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from "@mui/material";
import { AddTaskTextarea } from "./add-task-textarea";
export type AddTaskProps = {
  status: TaskStatus
}

export const AddTask = ({ status }: AddTaskProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    dispatch(create({
      description: text,
      status
    }));

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <Box
            sx={{
              width: '100%',
              paddingX: 3,
            }}
          >
            <AddTaskTextarea
              value={text}
              onChange={(value) => setText(value)}
            />
          </Box>
          <Box
            sx={{
              paddingX: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1
            }}
          >
            <Button
              onClick={() => setAdding(false)}
              variant="text"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                textTransform: 'none',
                color: 'secondary.main',
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'none',
                gap: 1
              }}
            >
              <span>Add</span>
              <AddIcon fontSize="small" />
            </Button>
          </Box>
        </motion.form>
      ) : (
        <Box
          sx={{
            color: 'secondary.main',
            cursor: 'pointer',
          }}
          display="flex"
          alignItems="center"
          paddingLeft={3}
          marginBottom={3}
          gap={1}
          onClick={() => setAdding(true)}
        >
          <span>Add Task</span>
          <AddIcon />
        </Box>
      )}
    </>
  );
};