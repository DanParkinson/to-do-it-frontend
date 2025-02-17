import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

// hooks
import useExpandToggle from "../hooks/useExpandToggle";

// Components
import TaskList from "./TaskList";

// This produces a list of the users categories
// All categories loaded as links
// Categories have use of expand toggle to show task lists

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
