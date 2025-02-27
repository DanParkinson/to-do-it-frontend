import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ListGroup, Button, Collapse } from "react-bootstrap";

import useToggle from "../hooks/useToggle";
import useCategoryTaskMap from "../hooks/useCategoryTaskMap";
import { useCategories } from "../context/CategoryContext";
import LoadingIndicator from "./LoadingIndicator";
import { truncateText } from "../utils/textUtils";

import styles from "../styles/components/SideBarCat.module.css";
import btnStyles from "../styles/general/Button.module.css";

const SideBarCat = ({ location }) => {
  const categories = useCategories();
  const { expandedItems, toggleItem } = useToggle();
  const categoryTaskMap = useCategoryTaskMap(categories);

  if (categories === null) {
    return <LoadingIndicator spinner message="Loading categories..." />;
  }

  return (
    <ListGroup className={styles.CategoryList}>
      {categories.map((category) => {
        // Check if the category is currently active
        const isActiveCategory =
          location.pathname === `/categories/${category.id}`;
        const isExpanded = expandedItems.includes(category.id);

        return (
          <div key={category.id}>
            <ListGroup.Item
              className={`${styles.CategoryItem} ${
                isActiveCategory ? styles.ActiveCategory : ""
              }`}
            >
              {/* Expand/Collapse Button */}
              <Button
                variant="link"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(category.id);
                }}
                className={btnStyles.ToggleButton}
              >
                {isExpanded ? "-" : "+"}
              </Button>

              {/* Clicking category name now navigates and expands */}
              <NavLink
                to={`/categories/${category.id}`}
                className={`${styles.CategoryLink} ${
                  isActiveCategory ? styles.ActiveCategory : ""
                }`}
                onClick={() => {
                  toggleItem(category.id); // Expand when clicking category name
                }}
              >
                {truncateText(category.name, 30)}
              </NavLink>
            </ListGroup.Item>

            {/* Task List */}
            <Collapse in={isExpanded}>
              <div>
                <ListGroup className={styles.TaskList}>
                  {category.task_ids.length > 0 ? (
                    categoryTaskMap[category.id]?.map((task) => {
                      // Check if the task is currently active
                      const isActiveTask =
                        location.pathname === `/tasks/${task.id}`;

                      return (
                        <ListGroup.Item
                          key={task.id}
                          className={`${styles.TaskItem} ${
                            isActiveTask ? styles.ActiveTask : ""
                          }`}
                        >
                          <NavLink
                            to={`/tasks/${task.id}`}
                            className={`${styles.TaskLink} ${
                              isActiveTask ? styles.ActiveTask : ""
                            }`}
                          >
                            {truncateText(task.title, 15)}
                          </NavLink>
                        </ListGroup.Item>
                      );
                    })
                  ) : (
                    <ListGroup.Item className={styles.TaskItem}>
                      No tasks in this category.
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </div>
            </Collapse>
          </div>
        );
      })}
    </ListGroup>
  );
};

// Use withRouter to access location in React Router v4
export default withRouter(SideBarCat);
