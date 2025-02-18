import React from "react";
import { Col, Row, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from "../styles/components/SideBar.module.css";

import SidebarNav from "./SideBarNav";

const SideBar = () => {
  //const setCategories = useSetCategories();
  //const categories = useCategories();
  //const currentUser = useCurrentUser();
  return (
    <Row className={styles.SideBarRow}>
      {/* Left Section: Navigation List */}
      <Col lg={2} md={3} sm={12} xs={12} className={styles.SideBarNav}>
        <SidebarNav />
      </Col>

      {/* Right Section: Placeholder Content */}
      <Col lg={10} md={9} className={styles.SideBarContent}>
        <h2>Home</h2>
      </Col>
    </Row>
  );
};

export default SideBar;
