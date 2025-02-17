import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import useExpandToggle from "../hooks/useExpandToggle";
import TaskList from "./TaskList";

const CategoryList = ({ categories }) => {
  const { expanded, toggle } = useExpandToggle();

  return (
    <ListGroup className="flex-column">
      {categories.map((category) => (
        <div key={category.id}>
          {/* Category Name */}
          <ListGroup.Item>
            <NavLink
              to={`/categories/${category.id}`}
              onClick={() => {
                toggle(category.id);
              }}
            >
              {expanded[category.id] ? "▼" : "▶"} {category.name}
            </NavLink>
          </ListGroup.Item>

          {/* Expandable Task List */}
          {expanded[category.id] && <TaskList taskIds={category.task_ids} />}
        </div>
      ))}
    </ListGroup>
  );
};

export default CategoryList;
