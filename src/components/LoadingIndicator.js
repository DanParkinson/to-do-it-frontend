import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/components/LoadingIndicator.module.css";

const LoadingIndicator = ({ spinner, message }) => {
  return (
    <div className={styles.LoadingContainer}>
      {spinner && <Spinner animation="border" />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
