import { TaskStatus } from "../store/slices/task-slice";

export const getAllowedStatuses = (status: TaskStatus) => {
  if (status === TaskStatus.TODO) {
    return [TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED];
  } 
  if (status === TaskStatus.IN_PROGRESS) {
    return [TaskStatus.TODO, TaskStatus.COMPLETED];
  }
  if (status === TaskStatus.COMPLETED) {
    return [TaskStatus.TODO, TaskStatus.IN_PROGRESS];
  }
}
