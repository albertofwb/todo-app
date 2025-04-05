import React, { useEffect } from 'react';
import { Modal, Input, Form } from 'antd';

const EditTaskModal = ({ visible, task, onCancel, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && task) {
      form.setFieldsValue({ taskText: task.text });
    }
  }, [visible, task, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      onSave(task.id, values.taskText);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Edit Task"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSave}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="taskText"
          rules={[{ required: true, message: 'Please enter a task' }]}
        >
          <Input placeholder="Task name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
