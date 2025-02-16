import { Modal } from "react-bootstrap";

// styles
import styles from "../styles/AuthModal.module.css";

// A reusable modal component that serves as a wrapper for authentication forms.
// It displays the modal when triggered and can be closed when needed.

const AuthModal = ({ show, handleClose, children }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName={styles.CustomModal}
    >
      {/* Modal Body containing the authentication form */}
      <Modal.Body className={styles.ModalBody}>{children}</Modal.Body>
    </Modal>
  );
};

export default AuthModal;
