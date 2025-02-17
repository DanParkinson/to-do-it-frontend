import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { Form, Button, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useSetCurrentUser } from "../../context/CurrentUserContext";
import AuthModal from "../../components/AuthModal";

function SignInForm({ show, handleClose }) {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(res.data.user);
      if (handleClose) handleClose();
      history.push("/");
    } catch (err) {
      console.error("SignInForm - Error response:", err.response?.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <AuthModal show={show} handleClose={handleClose} title="Sign In">
      <Container
        className={`justify-content-center align-items-center ${styles.FormContainer}`}
      >
        <h1 className={styles.FormTitle}>Sign In</h1>
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

          <Form.Group controlId="password" className={styles.FormGroup}>
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              className={styles.FormControl}
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Button type="submit" className={btnStyles.PrimaryButton}>
            Sign In
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
            handleClose();
          }}
        >
          Don't Have an account?{" "}
          <span className={styles.SignInText}>Sign Up</span>
        </Link>
      </Container>
    </AuthModal>
  );
}

export default SignInForm;
