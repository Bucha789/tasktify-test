export const tasks = [
  {
    id: "1",
    description: "Create project documentation",
    status: 'todo',
    createdAt: "2024-01-01T10:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
    
  },
  {
    id: "2",
    description: "Set up development environment",
    status: 'in-progress',
    createdAt: "2024-01-01T11:00:00.000Z",
    allowedStatuses: ['todo', 'completed']
  },
  {
    id: "3",
    description: "Design database schema",
    status: 'completed',
    createdAt: "2024-01-01T12:00:00.000Z",
    allowedStatuses: ['todo', 'in-progress']
  },
  {
    id: "4",
    description: "Implement user authentication",
    status: 'todo',
    createdAt: "2024-01-01T13:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
  },
  {
    id: "5",
    description: "Write unit tests",
    status: 'todo',
    createdAt: "2024-01-01T14:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
  },
  {
    id: "6",
    description: "Implement error handling",
    status: 'todo',
    createdAt: "2024-01-01T15:00:00.000Z",
    allowedStatuses: ['todo', 'in-progress']
  },
  {
    id: "7",
    description: "Add input validation",
    status: 'todo',
    createdAt: "2024-01-01T16:00:00.000Z",
    allowedStatuses: ['todo', 'in-progress']
  },
  {
    id: "8",
    description: "Create API documentation",
    status: 'todo',
    createdAt: "2024-01-01T17:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
  },
  {
    id: "9",
    description: "Implement search functionality",
    status: 'todo',
    createdAt: "2024-01-01T18:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
  },
  {
    id: "10",
    description: "Add pagination support",
    status: 'todo',
    createdAt: "2024-01-01T19:00:00.000Z",
    allowedStatuses: ['todo', 'in-progress']
  },
  {
    id: "11",
    description: "Optimize database queries",
    status: 'todo',
    createdAt: "2024-01-01T20:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
  },
  {
    id: "12",
    description: "Set up CI/CD pipeline",
    status: 'todo',
    createdAt: "2024-01-01T21:00:00.000Z",
    allowedStatuses: ['todo', 'in-progress']
  },
  {
    id: "13",
    description: "Add logging system",
    status: 'todo',
    createdAt: "2024-01-01T22:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
  },
  {
    id: "14",
    description: "Implement caching",
    status: 'todo',
    createdAt: "2024-01-01T23:00:00.000Z",
    allowedStatuses: ['todo', 'in-progress']
  },
  {
    id: "15",
    description: "Create user dashboard",
    status: 'todo',
    createdAt: "2024-01-02T00:00:00.000Z",
    allowedStatuses: ['in-progress', 'completed']
  }
]

export const taskLabels = {
  ['todo']: 'To Do',
  ['in-progress']: 'In Progress',
  ['completed']: 'Completed',
}