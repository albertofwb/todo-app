import React from 'react';
import { List, Empty } from 'antd';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, deleteTask, startEditing }) => {
  if (!tasks.length) {
    return <Empty description="No tasks yet" />;
  }

  return (
    <List
      className="task-list"
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <TaskItem
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            startEditing={startEditing}
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
