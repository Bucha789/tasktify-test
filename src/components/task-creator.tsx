import { IconButton, Input, Paper, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { create, TaskStatus } from "../store/slices/task-slice";
import { motion } from "framer-motion";
import AddIcon from '@mui/icons-material/Add';
import { taskSuggestions } from "../db/suggetions";
export type Task = {
  task: string;
  status: TaskStatus;
}

const initialFormState: Task = {
  task: "",
  status: TaskStatus.TODO
}

export const TaskCreator = () => {
  const [suggestion, setSuggestion] = useState<string>(taskSuggestions[0]);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [formState, setFormState] = useState<Task>(initialFormState);
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.task) return;
    dispatch(create({
      description: formState.task,
      status: TaskStatus.TODO,
    }));
    setFormState(initialFormState);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }
  useEffect(() => {
    if (formState.task) return;
    interval.current = setInterval(() => {
      setSuggestion(taskSuggestions[Math.floor(Math.random() * taskSuggestions.length)]);
    }, 2000);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, [formState.task])
  return (
    <Paper elevation={2} sx={{
      padding: 2,
      borderRadius: 2,
      backgroundColor: 'background.paper',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        borderRadius: 'inherit',
        padding: 0.5,
        background: 'linear-gradient(130deg, #55DDFF 0%, #C058F3 100%)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
      },
      '&:focus-within:before': {
        opacity: 1,
      },
      position: 'relative'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          opacity: formState.task ? 0 : 1,
        }}>
          <Typography
            component={motion.span}
            key={suggestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', bounce: 0 }}
            sx={{
              width: '100%',
              opacity: formState.task ? 0 : 1,
              color: 'text.secondary',
              fontSize: '1.25rem',
            }}
          >
            {suggestion}
          </Typography>
        </div>
        <Input
          name="task"
          type="text"
          size="medium"
          placeholder={'Type your task here...'}
          inputProps={{
            sx: {
              '&::placeholder': {
                opacity: 0,
              },
              fontSize: '1.25rem',
            },
          }}
          sx={{
            width: '85%',
          }}
          value={formState.task}
          onChange={handleChange}
        />
        <IconButton type="submit" color="secondary">
          <AddIcon fontSize="large" />
        </IconButton>
      </form>
    </Paper>
  )
}