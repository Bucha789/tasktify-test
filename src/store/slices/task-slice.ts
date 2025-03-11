import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';


export type TaskType = 'short' | 'medium' | 'long' | 'custom'
export type Task = {
  id: string
  description: string
  createdAt: string
  completedAt?: string
  completed: boolean
}

export type CurrentTask = Task & {
  currentDuration: number
}
export type TaskInput = Pick<Task, 'description' | 'completed'>
export type TaskId = Pick<Task, 'id'>
export type TaskModify = Pick<Task, 'id' | 'description'>

export type TasksState = {
  addedTasks: Task[]
}


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    addedTasks: [] as Task[],
  },
  reducers: {
    create: (state, action: PayloadAction<TaskInput>) => {
      const { description, completed } = action.payload;
      const id = uuidv4();
      state.addedTasks.push({
        createdAt: new Date().toISOString(),
        description,
        completed,
        id,
      })
    },
    modify: (state, action: PayloadAction<TaskModify>) => {
      const { id, description } = action.payload;
      state.addedTasks = state.addedTasks.map((task) => {
        if (task && task.id === id) {
          return {
            ...task,
            description,
          }
        }
        return task
      })
    },
    remove: (state, action: PayloadAction<TaskId>) => {
      state.addedTasks = state.addedTasks.filter(item => item.id !== action.payload.id)
    },
    markAsCompleted: (state, action: PayloadAction<TaskId>) => {
      state.addedTasks = state.addedTasks.map((task) => {
        if (task && task.id === action.payload.id) {
          return {
            ...task,
            completed: true,
            completedAt: new Date().toISOString(),
          }
        }
        return task
      })
    },
  },
})

export const { create, markAsCompleted, modify, remove } = tasksSlice.actions


export default tasksSlice.reducer