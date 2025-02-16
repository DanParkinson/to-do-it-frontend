import React from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "../styles/AddButtons.module.css";
import btnStyles from "../styles/Button.module.css";

const AddButtons = () => {
  const history = useHistory();

  return (
    <Container className={styles.AddButtonsContainer}>
      <Button
        className={btnStyles.PrimaryButton}
        activeClassName={styles.Active}
        onClick={() => history.push("/tasks/create")}
      >
        New Task
      </Button>
      <Button
        className={btnStyles.PrimaryButton}
        activeClassName={styles.Active}
        onClick={() => history.push("/categories/create")}
      >
        New Category
      </Button>
    </Container>
  );
};

export default AddButtons;
