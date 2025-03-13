import { Input } from "@mui/material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
export type EditTaskFormProps = {
  initialState: {
    description: string
  }
  onSubmit: (task: string) => void
}


export const EditTaskForm = ({ onSubmit, initialState }: EditTaskFormProps) => {
  const [formState, setFormState] = useState<typeof initialState>(initialState);
  const handleSaveTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formState.description);
    setFormState(initialState);
  }

  const handleEditTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  return <form onSubmit={handleSaveTask} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
    <Input type="text" value={formState.description} name="description" autoFocus onChange={handleEditTask} sx={{ width: '100%' }} />
    <IconButton type="submit" color="secondary">
      <CheckIcon />
    </IconButton>
  </form>;
}
