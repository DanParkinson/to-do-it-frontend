// React imports
import React, { useState } from "react";
// Routing
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//Bootstrap
import { Form, Button, Container, Alert } from "react-bootstrap";
// Styling
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
// Hooks
import AuthModal from "../../components/AuthModal";

function SignUpForm({ show, handleClose }) {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      if (handleClose) handleClose();
      history.push("/"); // needs to be directed to sign in modal
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <AuthModal show={show} handleClose={handleClose} title="Sign Up">
      <Container
        className={`justify-content-center align-items-center ${styles.FormContainer}`}
      >
        <h1 className={styles.FormTitle}>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className={styles.FormGroup}>
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              className={styles.FormControl}
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.username?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password1" className={styles.FormGroup}>
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
              className={styles.FormControl}
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password1?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password2" className={styles.FormGroup}>
            <Form.Label className="d-none">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              className={styles.FormControl}
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password2?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Button type="submit" className={btnStyles.PrimaryButton}>
            Sign Up
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
        <Link
          to="#"
          className={styles.SignInLink}
          onClick={() => {
            handleClose(); // Close Sign Up modal
          }}
        >
          Already have an account?{" "}
          <span className={styles.SignInText}>Sign In</span>
        </Link>
      </Container>
    </AuthModal>
  );
}

export default SignUpForm;
