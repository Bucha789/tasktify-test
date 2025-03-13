import { tasks } from '../../../db/tasks';
import reducer, { TasksState, TaskInput, TaskModify, TaskStatus, changeTaskStatus, create, modify, remove } from '../../../store/slices/task-slice';
import { describe, it, expect } from 'vitest';

describe('Task slice', async () => {
  const initialState: TasksState = {
    addedTasks: [],
  }
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      {
        addedTasks: tasks,
      }
    )
  });

  it('should handle changeTaskStatus', () => {
    const initialState: TasksState = {
      addedTasks: [
        {
          description: 'task',
          id: '2',
          createdAt: '2022-01-01',
          status: TaskStatus.TODO,
        },
      ],
    };

    const actual = reducer(initialState, changeTaskStatus({ id: initialState.addedTasks[0].id, status: TaskStatus.COMPLETED }));
    expect(actual).toEqual({
      addedTasks: [
        {
          ...initialState.addedTasks[0],
          status: TaskStatus.COMPLETED,
          allowedStatuses: [TaskStatus.TODO, TaskStatus.IN_PROGRESS],
        },
      ],
    });
  });

  it('should handle create', () => {
    const task: TaskInput = {
      description: 'task',
      status: TaskStatus.TODO,
    }

    const actual = reducer(initialState, create(task));
    expect(actual).toEqual({
      addedTasks: [{
        ...task,
        id: expect.any(String),
        createdAt: expect.any(String),
        allowedStatuses: [TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
      }],
    });
  });

  it('should handle modify', () => {
    const initialState: TasksState = {
      addedTasks: [
        {
          description: 'task',
          id: '1',
          status: TaskStatus.TODO,
          createdAt: '2022-01-01',
          allowedStatuses: [TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
        },
      ],
    };

    const modifiedTask: TaskModify = {
      description: 'modified task',
      id: '1',
    };

    const actual = reducer(initialState, modify(modifiedTask));
    expect(actual).toEqual({
      addedTasks: [
        {
          ...modifiedTask,
          id: '1',
          createdAt: '2022-01-01',
          status: TaskStatus.TODO,
          allowedStatuses: [TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
        },
      ],
    });
  });

  it('should handle remove', () => {

    const initialState: TasksState = {
      addedTasks: [
        {
          description: 'task',
          id: '1',
          status: TaskStatus.TODO,
          createdAt: '2022-01-01',
        },
      ],
    };

    const actual = reducer(initialState, remove({ id: '1' }));
    expect(actual).toEqual({
      addedTasks: [],
    });
  });
});