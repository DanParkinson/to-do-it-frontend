import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
// import styles from "../styles/Sidebar.module.css";
import useUserCategories from "../hooks/useUserCategories";

const SideBar = () => {
  const { categories, loading } = useUserCategories();

  return (
    <aside>
      <h2>Categories</h2>

      {loading && <p>Loading...</p>}

      {categories.length > 0 ? (
        <ListGroup className="flex-column">
          {categories.map((category) => (
            <ListGroup.Item key={category.id}>
              <NavLink to={`/categories/${category.id}`}>
                {category.name}
              </NavLink>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        !loading && <p>You don't have any categories yet.</p>
      )}
    </aside>
  );
};

export default SideBar;
