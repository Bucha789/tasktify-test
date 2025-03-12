import { Button, Input, Paper } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { create } from "../store/slices/task-slice";


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
  const [placeholder, setPlaceholder] = useState<string>(taskSuggestions[0]);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [formState, setFormState] = useState<Task>(initialFormState);
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    interval.current = setInterval(() => {
      setPlaceholder(taskSuggestions[Math.floor(Math.random() * taskSuggestions.length)]);
    }, 3000);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, [])
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
      }}>
        <Input
          name="task"
          type="text"
          placeholder={placeholder}
          value={formState.task}
          onChange={handleChange}
          sx={{
            width: '85%',
          }}
        />
        <Button type="submit" variant="contained" color="primary">Add</Button>
      </form>
    </Paper>
  )
}