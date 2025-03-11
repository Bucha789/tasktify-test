import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/task-slice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: combineReducers({
      tasks: tasksReducer
    }),
    preloadedState
  })
}

//As we use Typescript to keep the types of our store, we have to export the RootState and AppDispatch types.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore> 