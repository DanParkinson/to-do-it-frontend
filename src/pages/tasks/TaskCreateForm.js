import { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import useUserCategories from "../../hooks/useUserCategories";

function TaskCreateForm() {
  const [errors, setErrors] = useState({});
  const { categories, loading } = useUserCategories();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
    priority: "",
    status: "",
  });
  const { title, description, category, due_date, priority, status } = taskData;

  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("due_date", due_date);
    formData.append("priority", priority);
    formData.append("status", status);

    try {
      const { data } = await axiosReq.post("/tasks/", formData);
      history.push(`/tasks/${data.id}`);
    } catch (err) {
      console.log("Error response status:", err.response.status); // Logs HTTP status code
      console.log("Error response data:", err.response.data); // Logs detailed API error

      if (err.response?.status === 400) {
        setErrors(err.response.data); // Set errors for UI display
      }
    }
  };

  return (
    <Container fluid className={styles.TaskCreateContainer}>
      <Row
        className={`justify-content-center align-items-center ${styles.RowContainer}`}
      >
        <Col xs={12} md={10} lg={10}>
          <Form onSubmit={handleSubmit}>
            <h1 className={styles.FormTitle}>Create a Task</h1>
            <Row>
              {/* Left Side: Title & Description */}
              <Col>
                <Form.Group controlId="title" className={styles.FormGroup}>
                  <Form.Label className="d-none">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    className={styles.FormControl}
                    value={title}
                    onChange={handleChange}
                    name="title"
                  />
                </Form.Group>
                {errors?.title?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group
                  controlId="description"
                  className={styles.FormGroup}
                >
                  <Form.Label className="d-none">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Description"
                    className={`${styles.FormControl} ${styles.Textarea}`}
                    value={description}
                    onChange={handleChange}
                    name="description"
                  />
                </Form.Group>
                {errors?.description?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                {/* Submit Button */}
                <Button type="submit" className={btnStyles.PrimaryButton}>
                  Create Task
                </Button>
              </Col>

              {/* Right Side: Category, Status (Radial Menu), Priority (Radial Menu), Due Date */}
              <Col>
                {/* Category */}
                <Form.Group controlId="category" className={styles.FormGroup}>
                  <Form.Label className="d-none">Category</Form.Label>
                  <Form.Control
                    as="select"
                    className={styles.FormControl}
                    value={category}
                    onChange={handleChange}
                    name="category"
                  >
                    <option value="">Select a Category</option>
                    {loading ? (
                      <option disabled>Loading categories...</option>
                    ) : categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>
                        You need to create a category first!
                      </option>
                    )}
                  </Form.Control>
                </Form.Group>
                {errors?.category?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                {/* Due Date */}
                <Form.Group controlId="due_date" className={styles.FormGroup}>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Due Date"
                    className={styles.FormControl}
                    value={due_date}
                    onChange={handleChange}
                    name="due_date"
                  />
                </Form.Group>
                {errors?.due_date?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                {/* Status */}
                <Form.Group controlId="status" className={styles.FormGroup}>
                  <Form.Label className="d-none">Status</Form.Label>
                  <Form.Control
                    as="select"
                    className={styles.FormControl}
                    value={status}
                    onChange={handleChange}
                    name="status"
                  >
                    <option value="">Select a Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </Form.Control>
                </Form.Group>
                {errors?.status?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                {/* Priority */}
                <Form.Group controlId="priority" className={styles.FormGroup}>
                  <Form.Label className="d-none">Priority</Form.Label>
                  <Form.Control
                    as="select"
                    className={styles.FormControl}
                    value={priority}
                    onChange={handleChange}
                    name="priority"
                  >
                    <option value="">Select a Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Control>
                </Form.Group>
                {errors?.priority?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskCreateForm;
