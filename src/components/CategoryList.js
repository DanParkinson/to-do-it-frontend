import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";

import styles from "../styles/components/CategoryList.module.css";
import btnStyles from "../styles/general/Button.module.css";
import useCategoryTasks from "../hooks/useCategoryTasks";
import useToggle from "../hooks/useToggle";

// This produces a list of the users categories
// All categories loaded as links
// Categories have use of expand toggle to show task lists

const CategoryList = ({ categories }) => {
  const { expandedItems, toggleItem } = useToggle();

  return (
    <ListGroup className={styles.CategoryList}>
      {categories.map((category) => (
        <ListGroup.Item key={category.id} className={styles.CategoryItem}>
          <Button
            variant="link"
            onClick={() => toggleItem(category.id)}
            className={btnStyles.ToggleButton}
          >
            {expandedItems.includes(category.id) ? "−" : "+"}
          </Button>
          <NavLink
            to={`/categories/${category.id}`}
            className={styles.CategoryLink}
          >
            {category.name}
          </NavLink>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CategoryList;
