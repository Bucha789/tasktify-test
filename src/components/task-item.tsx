import { useState } from "react";
import { markAsCompleted, modify, remove } from "../store/slices/task-slice";
import { useDispatch } from "react-redux";

export type TaskItemProps = {
  description: string
  completed: boolean
  id: string
}

export const TaskItem = ({ description, completed, id }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [taskDescription, setTaskDescription] = useState(description);
  const handleEditTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  }
  const handleSaveTask = () => {
    setIsEditing(false);
    dispatch(modify({
      id,
      description: taskDescription
    }));
  }
  const handleDeleteTask = () => {
    dispatch(remove({
      id
    }));
  }
  const handleCompleteTask = () => {
    dispatch(markAsCompleted({
      id,
    }));
  }

  return (
    <div>
      {
        isEditing ? (
        <div>
          <input type="text" value={taskDescription} onChange={handleEditTask} />
          <button onClick={handleSaveTask}>Save</button>
        </div>
      ) : (
        <div>
          <input type="checkbox" checked={completed} onChange={handleCompleteTask} />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteTask}>Delete</button>
          <span>{description}</span>
        </div>
      )}
    </div>
  )
}