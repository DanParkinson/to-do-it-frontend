import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// import styles from "../styles/LandingLayout.module.css";

const LandingLayout = () => {
  return (
    <Container fluid>
      <Row>
        {/* Left Column: Authentication Forms */}
        <Col>
          <div>
            <h2>Authentication</h2>
            <p>Sign in sign up</p>
          </div>
        </Col>

        {/* Right Column: Placeholder for Image */}
        <Col>
          <div>
            <p>Image Placeholder</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingLayout;
