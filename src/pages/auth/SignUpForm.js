import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const SignUpForm = () => {
  return (
    <Container fluid className={styles.SignInUpContainer}>
      <Row
        className={`justify-content-center align-items-center ${styles.RowContainer}`}
      >
        {/* Sign up form coloumn */}
        <Col xs={12} md={10} lg={6} className="d-flex flex-column">
          <Container>
            <h1 className={styles.FormTitle}>Sign Up</h1>
            <Form>
              <Form.Group controlId="username" className={styles.FormGroup}>
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  className={styles.FormControl}
                />
              </Form.Group>

              <Form.Group controlId="email" className={styles.FormGroup}>
                <Form.Label className="d-none">Email address</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Email (Optional)"
                  name="email"
                  className={styles.FormControl}
                />
              </Form.Group>

              <Form.Group controlId="password1" className={styles.FormGroup}>
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password1"
                  className={styles.FormControl}
                />
              </Form.Group>

              <Form.Group controlId="password2" className={styles.FormGroup}>
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  className={styles.FormControl}
                />
              </Form.Group>

              <Button type="submit" className={btnStyles.PrimaryButton}>
                Sign Up
              </Button>
            </Form>
          </Container>

          <Container>
            <Link to="/signin" className={styles.SignInLink}>
              Have an account?{" "}
              <span className={styles.SignInText}>Sign in</span>
            </Link>
          </Container>
        </Col>

        {/* Image Column (Hidden on Small Screens) */}
        <Col xs={12} md={6} lg={6} className="d-none d-lg-block">
          <Image
            src={
              "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
            }
            alt="Sign Up Illustration"
            className={`img-fluid ${styles.SignupImage}`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
