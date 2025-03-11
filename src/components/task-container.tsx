import { useSelector } from "react-redux"
import { RootState } from "../store"
import { TaskItem } from "./task-item"

export const TaskContainer = () => {
  const tasks = useSelector((state: RootState) => state.tasks.addedTasks)
  return <div>
    {tasks.map((task) => (
      <TaskItem key={task.id} {...task} />
    ))}
  </div>
}