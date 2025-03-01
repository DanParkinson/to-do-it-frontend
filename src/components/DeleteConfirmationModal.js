import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import styles from "../styles/components/ModalStyles.module.css";
import btnStyles from "../styles/general/Button.module.css";

const DeleteConfirmationModal = ({ show, onClose, onConfirm, taskTitle }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={styles.ModalContainer}
    >
      <Modal.Header className={styles.ModalHeader}>
        <Modal.Title className={styles.ModalTitle}>
          Confirm Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.ModalBody}>
        <p>Are you sure you want to delete "{taskTitle}"?</p>
        <p>This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer className={styles.ModalFooter}>
        <Button className={btnStyles.PrimaryButton} onClick={onClose}>
          Cancel
        </Button>
        <Button className={btnStyles.PrimaryButton} onClick={onConfirm}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
