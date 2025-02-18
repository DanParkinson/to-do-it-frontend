import React, { useState } from "react";
import axios from "axios";

import { Form, Button, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import formStyles from "../../styles/general/Forms.module.css";

function SignUpForm({ toggleForm }) {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});

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
      toggleForm();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={styles.FormContainer}>
      <h1 className={formStyles.FormTitle}>Sign Up</h1>
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

        <Form.Group controlId="password1" className={formStyles.FormGroup}>
          <Form.Label className="d-none">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password1"
            className={formStyles.FormControl}
            value={password1}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.password1?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="password2" className={formStyles.FormGroup}>
          <Form.Label className="d-none">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password2"
            className={formStyles.FormControl}
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

      {/* Toggle to Sign In */}
      <p className={styles.ToggleText}>
        Already have an account?{" "}
        <span className={styles.ToggleLink} onClick={toggleForm}>
          Sign In
        </span>
      </p>
    </Container>
  );
}

export default SignUpForm;
