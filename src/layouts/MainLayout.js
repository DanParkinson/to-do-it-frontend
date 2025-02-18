import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/layouts/MainLayout.module.css";

import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <>
      <TopBar />
      <Container fluid className={styles.MainContainer}>
        {/* Sidebar & Main Content */}
        <Row className={styles.MainRow}>
          {/* Sidebar (Navigation + Categories) */}
          <Col lg={3} md={4} sm={2} xs={2} className={styles.SideBar}>
            <SideBar />
          </Col>

          {/* Main Content */}
          <Col lg={9} md={8} sm={10} xs={10} className={styles.MainContent}>
            <h2> Main Content</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainLayout;
