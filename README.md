# React Todo App

A modern Todo application built with React, Vite, and Ant Design.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Mark tasks as completed
- ✅ Separate views for active and completed tasks
- ✅ Timestamps for task creation and completion times
- ✅ Data persistence with localStorage
- ✅ Responsive design for desktop and mobile devices
- ✅ Modern UI with Ant Design

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **Vite**: Next generation frontend tooling
- **Ant Design**: A design system for enterprise-level products
- **UUID**: For generating unique IDs for tasks

## Project Structure

```
todo-app/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── TaskForm.jsx       # Form for adding new tasks
│   │   ├── TaskItem.jsx       # Individual task component
│   │   ├── TaskList.jsx       # List of tasks
│   │   └── EditTaskModal.jsx  # Modal for editing tasks
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
└── package.json         # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14.18+ or v16+)
- npm or yarn

### Installation

1. Clone the repository or download the project files

2. Navigate to the project directory
   ```
   cd todo-app
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Build for production
   ```
   npm run build
   ```

## Usage

1. **Adding a Task**:
   - Type your task in the input field at the top
   - Click "Add" or press Enter

2. **Completing a Task**:
   - Click the checkbox next to a task to mark it as completed
   - The task will display both creation and completion timestamps

3. **Editing a Task**:
   - Click the edit icon next to a task
   - Update the task in the modal that appears
   - Click "OK" to save changes

4. **Deleting a Task**:
   - Click the delete icon next to a task

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [Ant Design](https://ant.design/)
- Bundled with [Vite](https://vitejs.dev/)
