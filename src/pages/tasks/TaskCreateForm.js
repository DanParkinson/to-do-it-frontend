import { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/pages/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import formStyles from "../../styles/general/Forms.module.css";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetCategories } from "../../context/CategoryContext";
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
  const setCategories = useSetCategories();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Selected Category:", category);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category || "");
    formData.append("due_date", due_date);
    formData.append("priority", priority);
    formData.append("status", status);

    try {
      const { data } = await axiosReq.post("/tasks/", formData);
      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category.id === data.category) {
            return {
              ...category,
              task_count: category.task_count + 1,
              task_ids: [...category.task_ids, data.id],
            };
          }
          return category;
        });
      });
      history.push(`/tasks/${data.id}`);
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <Container fluid className={styles.MainContainer}>
      <Form onSubmit={handleSubmit}>
        {/* Heading - Always at the top */}
        <Row className={styles.RowHeading}>
          <Col lg={6} className={styles.ColHeading}>
            <h1 className={styles.Heading}>Create a Task</h1>
          </Col>
          <Col
            lg={6}
            className={`d-none d-lg-block ${styles.ColHeading}`}
          ></Col>
        </Row>

        {/* Title & Options - Side by side on large screens, stacked on small screens */}
        <Row className={styles.RowContent}>
          <Col lg={6} md={6} className={styles.ColTitle}>
            <Form.Group controlId="title" className={formStyles.FormGroup}>
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleChange}
                name="title"
                className={formStyles.FormControl}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group
              controlId="description"
              className={formStyles.FormGroup}
            >
              <Form.Label className="d-none">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description"
                value={description}
                onChange={handleChange}
                name="description"
                className={formStyles.FormControl}
              />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
          <Col lg={6} md={6} className={styles.ColOptions}>
            <Form.Group controlId="category" className={formStyles.FormGroup}>
              <Form.Label className="d-none">Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={handleChange}
                name="category"
                className={formStyles.FormControl}
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
                  <option disabled>You need to create a category first!</option>
                )}
              </Form.Control>
            </Form.Group>
            {errors?.category?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Due Date */}
            <Form.Group controlId="due_date" className={formStyles.FormGroup}>
              <Form.Label className="d-none">Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Due Date"
                value={due_date}
                onChange={handleChange}
                name="due_date"
                className={formStyles.FormControl}
              />
            </Form.Group>
            {errors?.due_date?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Status */}
            <Form.Group controlId="status" className={formStyles.FormGroup}>
              <Form.Label className="d-none">Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={handleChange}
                name="status"
                className={formStyles.FormControl}
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
            <Form.Group controlId="priority" className={formStyles.FormGroup}>
              <Form.Label className="d-none">Priority</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={handleChange}
                name="priority"
                className={formStyles.FormControl}
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

        {/* Button - Always at the bottom */}
        <Row className={styles.RowButton}>
          <Col className={styles.ColButton}>
            {/* Submit Button */}
            <Button type="submit" className={btnStyles.PrimaryButton}>
              Create Task
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default TaskCreateForm;
