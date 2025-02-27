import React from "react";
import { Modal, Button } from "react-bootstrap";

import btnStyles from "../styles/general/Button.module.css";

const DeleteCategoryModal = ({ show, onClose, onConfirm, categoryName }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete the category{" "}
          <strong>{categoryName}</strong>?
        </p>
        <span>This will also delete all associated tasks.</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className={btnStyles.DeleteButton} onClick={() => onConfirm()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategoryModal;
