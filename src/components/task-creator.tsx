import { Button, Input, Paper, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { create } from "../store/slices/task-slice";
import { motion } from "framer-motion";

export const taskSuggestions = [
  "🏃 Go for a morning run...",
  "📚 Read a chapter of my favorite book...",
  "🧹 Clean and organize my desk...",
  "🥗 Prepare a healthy lunch...",
  "💻 Complete the coding assignment...",
  "🌱 Water the houseplants...",
  "📝 Write in my journal...",
  "🧘‍♀️ Do 15 minutes of meditation...",
  "🛒 Get groceries for the week...",
  "✉️ Respond to important emails.."
]
export type Task = {
  task: string;
  completed: boolean;
}

const initialFormState: Task = {
  task: "",
  completed: false
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
      completed: false
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
            }}
          >
            {suggestion}
          </Typography>
        </div>
        <Input
          name="task"
          type="text"
          placeholder={'Type your task here...'}
          inputProps={{
            sx: {
              '&::placeholder': {
                opacity: 0,
              },
            },
          }}
          sx={{
            width: '85%',
          }}
          value={formState.task}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">Add</Button>
      </form>
    </Paper>
  )
}