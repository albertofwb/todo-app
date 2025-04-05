import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import TodoApp from './components/TodoApp'; // We'll create this component next
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const { currentUser } = useAuth();

  return (
    <Layout className="layout">
      <Content className="content">
        <Routes>
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
          <Route 
            path="/todos" 
            element={
              <PrivateRoute>
                <TodoApp />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Content>
      <Footer className="footer">
        Todo App ©{new Date().getFullYear()} Created with React, Vite, and Ant Design
      </Footer>
    </Layout>
  );
}

export default App;
