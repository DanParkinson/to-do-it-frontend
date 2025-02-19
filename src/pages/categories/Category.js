import React from "react";

import styles from "../../styles/general/Tables.module.css";

const Category = ({ category, tasks }) => {
  const { name, task_count, created_at } = category;

  return (
    <div>
      <h2>{name}</h2>
      <p>
        <strong>Task Count:</strong> {task_count}
      </p>
      <p>
        <strong>Created At:</strong> {created_at}
      </p>

      <h3>Tasks</h3>
      <div className="TableContainer">
        {tasks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
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
    </div>
  );
};

export default Category;
