import { useState } from "react";
import { create, TaskStatus } from "../store/slices/task-slice";
import { Box } from "@mui/material";
import { AddTaskForm } from "./add-task-form";
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from "../store/hooks";
export type AddTaskProps = {
  status: TaskStatus
}

export const AddTask = ({ status }: AddTaskProps) => {
  const [adding, setAdding] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = ({ description }: { description: string }) => {
    if (!description.trim().length) return;
    dispatch(create({
      description,
      status
    }));
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <AddTaskForm
          onSubmit={handleSubmit}
          onClose={() => setAdding(false)}
        />
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