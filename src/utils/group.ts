import { TaskStatus, Task } from "../store/slices/task-slice";

export const groupTasksByStatus = (tasks: Task[], statusOrder: TaskStatus[]) => {
  return statusOrder.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);
}