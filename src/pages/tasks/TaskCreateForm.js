import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../../styles/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

function TaskCreateForm() {
  return (
    <Container fluid className={styles.TaskCreateContainer}>
      <Row
        className={`justify-content-center align-items-center ${styles.RowContainer}`}
      >
        <Col xs={12} md={10} lg={10}>
          <Form>
            <h1 className={styles.FormTitle}>Create a Task</h1>
            <Row>
              {/* Left Side: Title & Description */}
              <Col>
                <Form.Group controlId="title" className={styles.FormGroup}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    className={styles.FormControl}
                  />
                </Form.Group>

                <Form.Group
                  controlId="description"
                  className={styles.FormGroup}
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Description"
                    className={`${styles.FormControl} ${styles.Textarea}`}
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button type="submit" className={btnStyles.PrimaryButton}>
                  Create Task
                </Button>
              </Col>

              {/* Right Side: Category, Status (Radial Menu), Priority (Radial Menu), Due Date */}
              <Col>
                {/* Category */}
                <Form.Group controlId="category" className={styles.FormGroup}>
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" className={styles.FormControl}>
                    <option>Select a Category</option>
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Shopping</option>
                  </Form.Control>
                </Form.Group>

                {/* Due Date */}
                <Form.Group controlId="due_date" className={styles.FormGroup}>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control type="date" className={styles.FormControl} />
                </Form.Group>

                {/* Status  */}
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <div className={styles.RadioContainer}>
                    <label className={styles.RadioLabel}>
                      <input
                        type="radio"
                        name="status"
                        className={styles.HiddenRadio}
                      />
                      Pending
                    </label>
                    <label className={styles.RadioLabel}>
                      <input
                        type="radio"
                        name="status"
                        className={styles.HiddenRadio}
                      />
                      In Progress
                    </label>
                    <label className={styles.RadioLabel}>
                      <input
                        type="radio"
                        name="status"
                        className={styles.HiddenRadio}
                      />
                      Completed
                    </label>
                    <label className={styles.RadioLabel}>
                      <input
                        type="radio"
                        name="status"
                        className={styles.HiddenRadio}
                      />
                      Overdue
                    </label>
                  </div>
                </Form.Group>

                {/* Priority  */}
                <Form.Group controlId="priority">
                  <Form.Label>Priority</Form.Label>
                  <div className={styles.RadioContainer}>
                    <label className={styles.RadioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        className={styles.HiddenRadio}
                      />
                      High
                    </label>
                    <label className={styles.RadioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        className={styles.HiddenRadio}
                      />
                      Medium
                    </label>
                    <label className={styles.RadioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        className={styles.HiddenRadio}
                      />
                      Low
                    </label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskCreateForm;
