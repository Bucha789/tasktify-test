import { Button } from "@mui/material";

import { Box } from "@mui/material";
import { AddTaskTextarea } from "./add-task-textarea";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
export type AddTaskFormProps = {
  onSubmit: ({ description }: { description: string }) => void
  onClose: () => void
}

const initialFormState = {
  description: '',
}

export const AddTaskForm = ({
  onSubmit,
  onClose,
}: AddTaskFormProps) => {
  const [formState, setFormState] = useState<typeof initialFormState>(initialFormState)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      description: formState.description
    });
    setFormState(initialFormState);
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <motion.form layout onSubmit={handleSubmit}>
    <Box
      sx={{
        width: '100%',
        paddingX: 3,
      }}
    >
      <AddTaskTextarea
        value={formState.description}
        name="description"
        onChange={handleChange}
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
        onClick={onClose}
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
  );
};
