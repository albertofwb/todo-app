# React Todo App

A modern full-stack Todo application built with React, Node.js, Express, MongoDB, and Ant Design.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Mark tasks as completed
- ✅ Separate views for active and completed tasks
- ✅ Timestamps for task creation and completion times
- ✅ User authentication with JWT
- ✅ Persistent data storage with MongoDB
- ✅ RESTful API backend
- ✅ Responsive design for desktop and mobile devices
- ✅ Modern UI with Ant Design

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **Vite**: Next generation frontend tooling
- **Ant Design**: A design system for enterprise-level products
- **Node.js**: JavaScript runtime for the backend
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Token for secure authentication
- **bcryptjs**: Library for password hashing
- **UUID**: For generating unique IDs

## Project Structure

```
todo-app/
├── public/              # Static assets
├── src/                # Frontend source code
│   ├── components/      # React components
│   │   ├── TaskForm.jsx       # Form for adding new tasks
│   │   ├── TaskItem.jsx       # Individual task component
│   │   ├── TaskList.jsx       # List of tasks
│   │   └── EditTaskModal.jsx  # Modal for editing tasks
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── server/              # Backend source code
│   ├── controllers/     # Route controllers
│   │   ├── auth.js      # Authentication controller
│   │   └── todos.js     # Todo items controller
│   ├── middleware/      # Express middleware
│   │   └── auth.js      # Authentication middleware
│   ├── models/          # Mongoose models
│   │   ├── User.js      # User model
│   │   └── Todo.js      # Todo model
│   ├── routes/          # Express routes
│   │   ├── auth.js      # Auth routes
│   │   └── todos.js     # Todo routes
│   └── server.js        # Express app entry point
├── index.html           # HTML template
├── .env                 # Environment variables (create this)
└── package.json         # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository or download the project files

2. Navigate to the project directory
   ```
   cd todo-app
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Install backend dependencies
   ```
   cd server
   npm install
   ```

5. Install frontend dependencies
   ```
   cd ..
   npm install
   ```

6. Start the backend server
   ```
   cd server
   npm run dev
   ```

7. In a new terminal, start the frontend development server
   ```
   cd todo-app
   npm run dev
   ```

8. Build for production
   ```
   npm run build
   ```

## Usage

1. **Registration & Login**:
   - Register with a name, email, and password
   - Login to access your personal todo list

2. **Adding a Task**:
   - Type your task in the input field at the top
   - Click "Add" or press Enter

3. **Completing a Task**:
   - Click the checkbox next to a task to mark it as completed
   - The task will display both creation and completion timestamps

4. **Editing a Task**:
   - Click the edit icon next to a task
   - Update the task in the modal that appears
   - Click "OK" to save changes

5. **Deleting a Task**:
   - Click the delete icon next to a task

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout a user

### Todos
- `GET /api/todos` - Get all todos for logged in user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## License

This project is open source and available under the [MIT License](LICENSE).

## TODO

- **Task Categories & Tags**: Implement categorization and tagging system to organize tasks by project, priority, or custom tags, making it easier to filter and manage complex task lists.

- **Task Sharing & Collaboration**: Enable users to share specific tasks or entire lists with other users, supporting team collaboration with permission levels for viewing or editing.

## Future Improvements

- **Docker Integration**: Containerize the application with Docker to simplify deployment and ensure consistency across different environments. This would make the setup process easier with a single `docker-compose up` command.

- **Testing Implementation**: Add comprehensive testing with Jest for the backend API routes and React Testing Library for frontend components. This would improve code reliability and make future refactoring safer.

- **GraphQL API Option**: Consider implementing a GraphQL API alongside the REST API to allow more efficient data fetching, especially for complex queries that may require multiple REST endpoints currently.

## Acknowledgments

- Backend built with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/)
- Frontend built with [React](https://react.dev/)
- UI components from [Ant Design](https://ant.design/)
- Bundled with [Vite](https://vitejs.dev/)
- Database: [MongoDB](https://www.mongodb.com/)
- Authentication: [JWT](https://jwt.io/)
