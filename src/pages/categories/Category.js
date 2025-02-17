import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import useCategoryTasks from "../../hooks/useCategoryTasks";

const Category = (props) => {
  const { id, name, owner, task_count, created_at, task_ids } = props;

  console.log("Category.js - task_ids:", task_ids);
  const { tasks, loading } = useCategoryTasks(task_ids);

  return (
    <div>
      <h2>{name}</h2>
      <p>Task Count: {task_count}</p>
      <p>Created At: {created_at}</p>

      <h3>Tasks</h3>
      {loading ? (
        <p>...Loading</p>
      ) : tasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.category_name}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.created_at}</td>
                <td>{task.due_date || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks in this category.</p>
      )}
    </div>
  );
};

export default Category;
