import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Divider, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import EditTaskModal from './EditTaskModal';
import { todoService } from '../services/api';

const { Title } = Typography;

function TodoApp() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await todoService.getAllTodos();
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to load tasks: ' + error.message);
      setLoading(false);
    }
  };

  const addTask = async (text) => {
    try {
      const response = await todoService.createTodo({ text });
      setTasks([...tasks, response.data]);
      message.success('Task added successfully');
    } catch (error) {
      message.error('Failed to add task: ' + error.message);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(task => task._id === id);
      if (!task) return;

      const updatedTask = { 
        ...task, 
        completed: !task.completed 
      };
      
      const response = await todoService.updateTodo(id, updatedTask);
      
      setTasks(
        tasks.map((task) => {
          if (task._id === id) {
            return response.data;
          }
          return task;
        })
      );
    } catch (error) {
      message.error('Failed to update task: ' + error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTasks(tasks.filter((task) => task._id !== id));
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Failed to delete task: ' + error.message);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const saveTask = async (id, newText) => {
    try {
      const task = tasks.find(task => task._id === id);
      if (!task) return;

      const updatedTask = { ...task, text: newText };
      const response = await todoService.updateTodo(id, updatedTask);
      
      setTasks(
        tasks.map((task) =>
          task._id === id ? response.data : task
        )
      );
      
      setModalVisible(false);
      setEditingTask(null);
      message.success('Task updated successfully');
    } catch (error) {
      message.error('Failed to update task: ' + error.message);
    }
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
              loading={loading}
            />
            
            {completedTasks.length > 0 && (
              <>
                <Divider>Completed Tasks</Divider>
                <TaskList
                  tasks={completedTasks}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                  startEditing={startEditing}
                  loading={loading}
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
