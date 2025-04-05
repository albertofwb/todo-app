import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Card, Divider } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    <Layout className="layout">
      <Header className="header">
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          Todo App
        </Title>
      </Header>
      <Content className="content">
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Card className="main-card">
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
      </Content>
      <Footer className="footer">
        Todo App ©{new Date().getFullYear()} Created with React, Vite, and Ant Design
      </Footer>

      <EditTaskModal
        visible={modalVisible}
        task={editingTask}
        onCancel={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        onSave={saveTask}
      />
    </Layout>
  );
}

export default App;
