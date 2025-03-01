import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import styles from "../styles/components/NotFound.module.css";
import btnStyles from "../styles/general/Button.module.css";

const NotFound = () => {
  const history = useHistory();

  return (
    <Container fluid className={styles.NotFoundContainer}>
      <div className={styles.Content}>
        <h1 className={styles.ErrorCode}>404</h1>
        <h2 className={styles.ErrorMessage}>Oops! Page Not Found</h2>
        <p className={styles.ErrorDescription}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Button
          className={btnStyles.PrimaryButton}
          onClick={() => history.push("/")}
        >
          Back to Tasks
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
