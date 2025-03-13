# Tasktify

A simple task management app built with React, TypeScript, and Vite. The app is built with MUI and uses the Redux Toolkit for state management.

Project is deployed on Netlify and can be accessed [here](https://xira-ai-frontend-test.netlify.app).

## Features

- **Responsive design**: Thanks to MUI, the app is responsive and works on all devices.
- **Drag and drop tasks**: The app uses the native HTML5 drag and drop API to move tasks between columns.
- **Redux Toolkit**: The app uses the Redux Toolkit for state management.
- **Dark mode**: The app has a dark mode toggle.

## Design

The app has two main views:
- **Task board**: The app has a task board with three columns: To Do, In Progress and Done.
![Task Board View](docs/images/views/board.png)
- **Task list**: The app has a task list view that displays all the tasks in a list.
![Task List View ](docs/images/views/list.png)

Also, the app has drag and drop functionality for the tasks management.
- Drag and drop tasks between columns.
![Drag and drop tasks between columns](docs/images/drag-and-drop/move.png)
![Drag and drop tasks between columns in list view](docs/images/drag-and-drop/move-list.png)
- Drag and drop tasks to delete them.
![Drag and drop tasks to delete them](docs/images/drag-and-drop/delete.png)
- Clicking on a task, the task can be edited.
![Clicking on a task, the task can be edited](docs/images/drag-and-drop/edit.png)

If you don't want to use the drag and drop functionality, you can use the buttons in the task item to edit, delete or complete the task.
![Task item buttons](docs/images/extra-buttons/task-item-buttons.png)

## Dark mode

The app has a dark mode toggle.
![Dark mode toggle](docs/images/dark-mode/toggle.png)

These are the modes available:
- Dark mode
![Dark mode](docs/images/dark-mode/dark-mode.png)
- Light mode
![Light mode](docs/images/dark-mode/light-mode.png)


## Videos with the app in action
### Drag and drop
![Drag and drop tasks between columns](docs/videos/drag-and-drop.gif)
### More Buttons
![More buttons](docs/videos/buttons.gif)


## Tech Stack
### [Redux Toolkit](https://redux-toolkit.js.org/)
  This library was used to manage the state of the application, tasks and the timer.

### [MUI](https://mui.com/)
  This library was used to create the UI of the application.

### [Vite](https://vitejs.dev/)
  This library was used to create the Vite project.


## Prerequisites
- Node.js
- npm
- Git

## Installation

1. Clone the repository

```bash
git clone git@github.com:Bucha789/xira-frontend-test.git
```

2. Install the dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

## Future Improvements
- Add a backend to store the tasks
- Add a login system
- Add a dashboard
- Add a settings page
- Add a help page
- Add a about page
- Improve the UI/UX
- Fix some bugs regarding the animations

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
