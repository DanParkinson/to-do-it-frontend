import React from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useCategoryTasks from "../hooks/useCategoryTasks";

const TaskList = ({ taskIds }) => {
  const { tasks, loading } = useCategoryTasks(taskIds);

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p>No tasks in this category.</p>;

  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item key={task.id} className="ps-4">
          <NavLink to={`/tasks/${task.id}`}>{task.title}</NavLink>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
