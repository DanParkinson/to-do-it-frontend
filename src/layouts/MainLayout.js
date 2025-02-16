import React from "react";
import SideBar from "../components/SideBar";
import AddButtons from "../components/AddButtons";

import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <Container fluid className={styles.MainContainer}>
      <Row className={styles.MainRow}>
        {/* Left Sidebar */}
        <Col xs={12} md={3} lg={2} className={styles.SideBarSection}>
          <SideBar />
          <AddButtons />
        </Col>
        {/* Main content area */}
        <Col
          xs={12}
          md={9}
          lg={10}
          className={`d-none d-sm-block ${styles.MainContent}`}
        >
          <main>{children}</main>
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout;
