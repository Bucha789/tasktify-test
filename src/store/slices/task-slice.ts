import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { tasks } from '../../db/tasks'
import { getAllowedStatuses } from '../../utils/tasks';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

export type Task = {
  id: string
  description: string
  createdAt: string
  status: TaskStatus
  allowedStatuses?: TaskStatus[]
}

export type CurrentTask = Task & {
  currentDuration: number
}
export type TaskInput = Pick<Task, 'description' | 'status' | 'allowedStatuses'>
export type TaskId = Pick<Task, 'id'>
export type TaskModify = Pick<Task, 'id' | 'description' | 'status'>

export type TasksState = {
  addedTasks: Task[]
}


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    addedTasks: tasks as Task[],
  },
  reducers: {
    create: (state, action: PayloadAction<TaskInput>) => {
      const { description, status } = action.payload;
      const id = uuidv4();
      const newTask: Task = {
        createdAt: new Date().toISOString(),
        description,
        id,
        status,
        allowedStatuses: getAllowedStatuses(status) || []
      };
      state.addedTasks.push(newTask);
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
    changeStatus: (state, action: PayloadAction<{
      id: string
      status: TaskStatus
      beforeId?: string
    }>) => {
      if (!action.payload.beforeId) {
      state.addedTasks = state.addedTasks.map((task) => {
        if (task && task.id === action.payload.id) {
          return { ...task, status: action.payload.status, allowedStatuses: getAllowedStatuses(action.payload.status) }
          }
          return task
        })
      } else {
        const task = state.addedTasks.find(task => task.id === action.payload.id) as Task;
        const newTask = { ...task, status: action.payload.status, allowedStatuses: getAllowedStatuses(action.payload.status) }
        const beforeTaskIndex = state.addedTasks.findIndex(task => task.id === action.payload.beforeId);
        const filteredTasks = state.addedTasks.filter(task => task.id !== action.payload.id);
        const index = beforeTaskIndex + 1;
        state.addedTasks = [
          ...filteredTasks.slice(0, index),
          newTask,
          ...filteredTasks.slice(index)
        ]
      }
    }
  }
})

export const { create, modify, remove, changeStatus } = tasksSlice.actions


export default tasksSlice.reducer