import React from "react";
import { Col, Row } from "react-bootstrap";

import SideBarNav from "./SideBarNav";
import SideBarCat from "./SideBarCat";

import { useCategories } from "../context/CategoryContext";

import styles from "../styles/components/SideBar.module.css";

const SideBar = () => {
  const categories = useCategories() || [];

  return (
    <Row className={styles.SideBarRow}>
      {/* Left Section: Navigation List */}
      <Col lg={2} md={3} sm={12} xs={12} className={styles.SideBarNav}>
        <SideBarNav />
      </Col>

      {/* Right Section: Placeholder Content */}
      <Col lg={10} md={9} className={styles.SideBarContent}>
        <SideBarCat categories={categories} />
      </Col>
    </Row>
  );
};

export default SideBar;
