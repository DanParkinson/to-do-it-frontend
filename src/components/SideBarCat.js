import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup, Button, Collapse } from "react-bootstrap";

import useToggle from "../hooks/useToggle";
import useCategoryTaskMap from "../hooks/useCategoryTaskMap";

import styles from "../styles/components/SideBarCat.module.css";
import btnStyles from "../styles/general/Button.module.css";

// This produces a list of the users categories
// All categories loaded as links
// Categories have use of expand toggle to show task lists

const SideBarCat = ({ categories }) => {
  const { expandedItems, toggleItem } = useToggle();
  const categoryTaskMap = useCategoryTaskMap(categories);

  return (
    <ListGroup className={styles.CategoryList}>
      {categories.map((category) => (
        <div key={category.id}>
          <ListGroup.Item className={styles.CategoryItem}>
            <Button
              variant="link"
              onClick={() => {
                toggleItem(category.id);
              }}
              className={btnStyles.ToggleButton}
            >
              {expandedItems.includes(category.id) ? "-" : "+"}
            </Button>

            <NavLink
              to={`/categories/${category.id}`}
              className={styles.CategoryLink}
            >
              {category.name}
            </NavLink>
          </ListGroup.Item>

          {/* Task List */}
          <Collapse in={expandedItems.includes(category.id)}>
            <div>
              <ListGroup className={styles.TaskList}>
                {category.task_ids.length > 0 ? (
                  categoryTaskMap[category.id]?.map((task) => (
                    <ListGroup.Item key={task.id} className={styles.TaskItem}>
                      <NavLink
                        to={`/tasks/${task.id}`}
                        className={styles.TaskLink}
                      >
                        {task.title}
                      </NavLink>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item className={styles.TaskItem}>
                    No tasks in this category.
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>
          </Collapse>
        </div>
      ))}
    </ListGroup>
  );
};

export default SideBarCat;
