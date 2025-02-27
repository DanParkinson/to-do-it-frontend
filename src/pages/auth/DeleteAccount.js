import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../context/CurrentUserContext";

import styles from "../../styles/pages/DeleteAccount.module.css";
import btnStyles from "../../styles/general/Button.module.css";

const DeleteAccount = () => {
  const history = useHistory();
  const setCurrentUser = useSetCurrentUser();
  const [confirmation, setConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    setConfirmation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (confirmation.toLowerCase() !== "delete my account") {
      setErrors({ confirmation: "You must type 'Delete my account' exactly." });
      return;
    }

    try {
      await axiosReq.delete("/delete-account/");

      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      setSuccessMessage("Your account has been deleted.");

      setTimeout(() => {
        setCurrentUser(null);
        history.push("/signin");
      }, 2000);
    } catch (err) {
      console.error("Error deleting account:", err.response?.data);
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <Container fluid className={styles.DeleteAccountContainer}>
      <h1 className={styles.Heading}>Delete Account</h1>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errors.general && <Alert variant="danger">{errors.general}</Alert>}

      <p className={styles.WarningText}>
        This action **cannot** be undone. All your data will be permanently
        deleted.
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            Type <strong>"Delete my account"</strong> to confirm:
          </Form.Label>
          <Form.Control
            type="text"
            name="confirmation"
            value={confirmation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {errors.confirmation && (
          <Alert variant="warning">{errors.confirmation}</Alert>
        )}

        <Button type="submit" className={btnStyles.DeleteAccountButton}>
          Confirm Deletion
        </Button>
      </Form>
    </Container>
  );
};

export default DeleteAccount;
