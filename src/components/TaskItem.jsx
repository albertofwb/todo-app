import React from 'react';
import { Checkbox, Button, Typography, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const TaskItem = ({ task, toggleComplete, deleteTask, startEditing }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="task-item">
      <Checkbox 
        checked={task.completed} 
        onChange={() => toggleComplete(task.id)}
      />
      <div style={{ marginLeft: 8, flex: 1 }}>
        <Text 
          style={{ 
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : 'inherit',
            display: 'block'
          }}
        >
          {task.text}
        </Text>
        <div className="task-times">
          <Tooltip title="Creation time">
            <Text type="secondary" style={{ fontSize: '12px', marginRight: 16 }}>
              <ClockCircleOutlined style={{ marginRight: 4 }} />
              {formatDate(task.createdAt)}
            </Text>
          </Tooltip>
          
          {task.completed && task.completedAt && (
            <Tooltip title="Completion time">
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <CheckCircleOutlined style={{ marginRight: 4 }} />
                {formatDate(task.completedAt)}
              </Text>
            </Tooltip>
          )}
        </div>
      </div>
      <Space>
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => startEditing(task)}
          disabled={task.completed}
        />
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => deleteTask(task.id)}
        />
      </Space>
    </div>
  );
};

export default TaskItem;
