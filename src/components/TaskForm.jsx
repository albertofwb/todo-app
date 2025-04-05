import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TaskForm = ({ addTask }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (!values.taskName.trim()) return;
    
    addTask(values.taskName);
    form.resetFields();
  };

  return (
    <Form 
      form={form}
      onFinish={handleSubmit}
      layout="horizontal"
      className="task-form"
    >
      <Form.Item 
        name="taskName" 
        rules={[{ required: true, message: 'Please enter a task' }]}
        style={{ marginBottom: 0, flex: 1 }}
      >
        <Input 
          placeholder="Add a new task" 
          size="large"
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0, marginLeft: 8 }}>
        <Button 
          type="primary" 
          htmlType="submit" 
          icon={<PlusOutlined />}
          size="large"
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
