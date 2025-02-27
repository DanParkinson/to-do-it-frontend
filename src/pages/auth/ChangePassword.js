import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import styles from "../../styles/pages/ChangePassword.module.css";
import btnStyles from "../../styles/general/Button.module.css";

const ChangePassword = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      const { old_password, new_password1, new_password2 } = formData;

      await axiosReq.post("/dj-rest-auth/password/change/", {
        old_password,
        new_password1,
        new_password2,
      });
      setSuccessMessage("Password successfully changed!");
      setTimeout(() => history.push("/"), 1000);
    } catch (err) {
      console.error("Error changing password:", err.response?.data);
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <Container fluid className={styles.PasswordContainer}>
      <h1 className={styles.Heading}>Change Password</h1>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errors.general && <Alert variant="danger">{errors.general}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="old_password"
            value={formData.old_password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.old_password && (
          <Alert variant="warning">{errors.old_password}</Alert>
        )}

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password1"
            value={formData.new_password1}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.new_password1 && (
          <Alert variant="warning">{errors.new_password1}</Alert>
        )}

        <Form.Group>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password2"
            value={formData.new_password2}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.new_password2 && (
          <Alert variant="warning">{errors.new_password2}</Alert>
        )}

        <Button type="submit" className={btnStyles.PrimaryButton}>
          Update Password
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
