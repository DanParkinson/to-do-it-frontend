import React from "react";
import { Modal, Button } from "react-bootstrap";

import btnStyles from "../styles/general/Button.module.css";

const DeleteConfirmationModal = ({ show, onClose, onConfirm, taskTitle }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete "{taskTitle}"?</p>
        <p>This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className={btnStyles.DeleteButton} onClick={onConfirm}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
