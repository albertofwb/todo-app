import { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Divider } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TodoApp from './TodoApp';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              Todo App
            </Title>
          </Col>
          <Col>
            <Text style={{ color: 'white', marginRight: '15px' }}>
              {currentUser.email}
            </Text>
            <Button onClick={handleLogout} type="primary" danger>
              Log Out
            </Button>
          </Col>
        </Row>
      </Header>
      
      <Content className="dashboard-content">
        {error && (
          <Row justify="center" style={{ marginTop: '20px' }}>
            <Col span={12}>
              <div className="error-alert">{error}</div>
            </Col>
          </Row>
        )}
        
        <Row justify="center" style={{ marginTop: '20px', marginBottom: '40px' }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Card className="welcome-card">
              <Title level={2}>Welcome to Your Todo Dashboard!</Title>
              <Text>Manage your tasks, stay organized, and boost your productivity.</Text>
            </Card>
          </Col>
        </Row>
        
        <TodoApp />
      </Content>
    </Layout>
  );
}
