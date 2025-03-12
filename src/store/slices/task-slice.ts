import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { tasks } from '../../db/tasks'

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

export type Task = {
  id: string
  description: string
  createdAt: string
  completedAt?: string
  status: string
}

export type CurrentTask = Task & {
  currentDuration: number
}
export type TaskInput = Pick<Task, 'description' | 'status'>
export type TaskId = Pick<Task, 'id'>
export type TaskModify = Pick<Task, 'id' | 'description'>

export type TasksState = {
  addedTasks: Task[]
}


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    addedTasks: tasks,
  },
  reducers: {
    create: (state, action: PayloadAction<TaskInput>) => {
      const { description, status } = action.payload;
      const id = uuidv4();
      state.addedTasks.push({
        createdAt: new Date().toISOString(),
        description,
        id,
        status,
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
    changeTaskStatus: (state, action: PayloadAction<{
      id: string
      status: TaskStatus
    }>) => {
      state.addedTasks = state.addedTasks.map((task) => {
        if (task && task.id === action.payload.id) {
          return { ...task, status: action.payload.status }
        }
        return task
      })
    }
  }
})

export const { create, modify, remove, changeTaskStatus } = tasksSlice.actions


export default tasksSlice.reducer