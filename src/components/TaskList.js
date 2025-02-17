import React from "react";
import { NavLink } from "react-router-dom";

import { ListGroup } from "react-bootstrap";

import useCategoryTasks from "../hooks/useCategoryTasks";

// component for the list dropdown used in CategoryList.js

const TaskList = ({ taskIds }) => {
  const { tasks, loading } = useCategoryTasks(taskIds);

  return (
    <ListGroup>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks in this category.</p>
      ) : (
        tasks.map((task) => (
          <ListGroup.Item key={task.id} className="ps-4">
            <NavLink to={`/tasks/${task.id}`}>{task.title}</NavLink>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

export default TaskList;
