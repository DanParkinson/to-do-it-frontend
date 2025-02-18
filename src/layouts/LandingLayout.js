import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import styles from "../styles/layouts/LandingLayout.module.css";

// Import SignIn and SignUp Forms
import SignInForm from "../pages/auth/SignInForm";
import SignUpForm from "../pages/auth/SignUpForm";

/**
 * LandingLayout Component
 * - Used for authentication-related pages (Sign In / Sign Up).
 * - Splits layout into two sections:
 *    1. Left: Authentication Form (children)
 *    2. Right: Placeholder for an image (to be added later)
 */

const LandingLayout = () => {
  // State to track whether the user is on Sign In or Sign Up
  const [isSigningIn, setIsSigningIn] = useState(true);
  const toggleForm = () => setIsSigningIn((prev) => !prev);

  return (
    <Container fluid className={styles.LandingContainer}>
      <Row className={styles.LandingRow}>
        {/* Left Column: Sign In / Sign Up */}
        <Col md={6}>
          {isSigningIn ? (
            <SignInForm toggleForm={toggleForm} />
          ) : (
            <SignUpForm toggleForm={toggleForm} />
          )}
        </Col>

        {/* Right Column: Placeholder for Image */}
        <Col md={6} className={styles.ImageContainer}>
          <div>
            <p>Image Placeholder</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingLayout;
