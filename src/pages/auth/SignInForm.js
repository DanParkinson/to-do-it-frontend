import React, { useState } from "react";
import axios from "axios";

import { Form, Button, Container, Alert } from "react-bootstrap";
import styles from "../../styles/pages/SignInUpForm.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import formStyles from "../../styles/general/Forms.module.css";

import { useSetCurrentUser } from "../../context/CurrentUserContext";

function SignInForm({ toggleForm }) {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});

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
    } catch (err) {
      console.error("SignInForm - Error response:", err.response?.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={styles.FormContainer}>
      <h1 className={formStyles.FormTitle}>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className={formStyles.FormGroup}>
          <Form.Label className="d-none">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            className={formStyles.FormControl}
            value={username}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.username?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="password" className={formStyles.FormGroup}>
          <Form.Label className="d-none">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className={formStyles.FormControl}
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

      {/* Toggle to Sign Up */}
      <p className={styles.ToggleText}>
        Don't have an account?{" "}
        <span className={styles.ToggleLink} onClick={toggleForm}>
          Sign Up
        </span>
      </p>
    </Container>
  );
}

export default SignInForm;
