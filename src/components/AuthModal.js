import { Modal } from "react-bootstrap";
import styles from "../styles/AuthModal.module.css";

const AuthModal = ({ show, handleClose, children }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName={styles.CustomModal}
    >
      <Modal.Body className={styles.ModalBody}>{children}</Modal.Body>
    </Modal>
  );
};

export default AuthModal;
