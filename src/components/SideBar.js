import React from "react";
import { Col, Row } from "react-bootstrap";

import SideBarNav from "./SideBarNav";
import SideBarCat from "./SideBarCat";

import { useCategories } from "../context/CategoryContext";

import styles from "../styles/components/SideBar.module.css";

const SideBar = () => {
  //const setCategories = useSetCategories();
  const categories = useCategories();
  //const currentUser = useCurrentUser();
  return (
    <Row className={styles.SideBarRow}>
      {/* Left Section: Navigation List */}
      <Col lg={2} md={3} sm={12} xs={12} className={styles.SideBarNav}>
        <SideBarNav />
      </Col>

      {/* Right Section: Placeholder Content */}
      <Col lg={10} md={9} className={styles.SideBarContent}>
        <h4> Categories</h4>
        {categories?.length > 0 ? (
          <SideBarCat categories={categories} />
        ) : (
          <p>You don't have any categories yet.</p>
        )}
      </Col>
    </Row>
  );
};

export default SideBar;
