import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Divider } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import EditTaskModal from './EditTaskModal';

const { Title } = Typography;

function TodoApp() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Generate a unique key for each user's tasks in localStorage
  const userTasksKey = `tasks_${currentUser.uid}`;

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem(userTasksKey);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [userTasksKey]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(userTasksKey, JSON.stringify(tasks));
  }, [tasks, userTasksKey]);

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const isCompleting = !task.completed;
          return {
            ...task,
            completed: isCompleting,
            // Record completion time if task is being completed, remove it if uncompleting
            completedAt: isCompleting ? new Date().toISOString() : null
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const saveTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setModalVisible(false);
    setEditingTask(null);
  };

  // Filter tasks
  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="todo-app-container">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card className="main-card">
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
              My Tasks
            </Title>
            
            <TaskForm addTask={addTask} />
            
            <Divider>Active Tasks</Divider>
            <TaskList
              tasks={activeTasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              startEditing={startEditing}
            />
            
            {completedTasks.length > 0 && (
              <>
                <Divider>Completed Tasks</Divider>
                <TaskList
                  tasks={completedTasks}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                  startEditing={startEditing}
                />
              </>
            )}
          </Card>
        </Col>
      </Row>

      <EditTaskModal
        visible={modalVisible}
        task={editingTask}
        onCancel={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        onSave={saveTask}
      />
    </div>
  );
}

export default TodoApp;
