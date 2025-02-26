import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

import styles from "../../styles/pages/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import formStyles from "../../styles/general/Forms.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import useFetchCategories from "../../hooks/useFetchCategories";

function TaskEditForm() {
  const { id } = useParams();
  const history = useHistory();
  const { categories, hasLoaded: categoriesLoaded } = useFetchCategories();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
    priority: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // For UI feedback
  const { title, description, category, due_date, priority, status } = taskData;

  // Fetch existing task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        setTaskData({
          title: data.title,
          description: data.description,
          category: data.category,
          due_date: data.due_date || "",
          priority: data.priority,
          status: data.status,
        });
      } catch (err) {
        console.error("Error fetching task:", err);
        history.push("/tasks");
      }
    };

    fetchTask();
  }, [id, history]);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  // **Handle Form Submission with Validation**
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category || "");
    formData.append("due_date", due_date);
    formData.append("priority", priority);
    formData.append("status", status);

    try {
      await axiosReq.put(`/tasks/${id}/`, formData);
      history.push(`/tasks/${id}`);
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      } else {
        console.error("Error updating task:", err);
        setErrors({ general: ["An unexpected error occurred."] });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Row className={styles.BackButtonRow}>
        <Col className={styles.BackButtonCol}>
          <Button
            variant="link"
            className={btnStyles.BackIcon}
            onClick={() => window.history.back()}
          >
            <i className="fa-regular fa-circle-left"></i>
          </Button>
        </Col>
      </Row>
      <Container fluid className={styles.MainContainer}>
        <Form onSubmit={handleSubmit}>
          <h1 className={formStyles.FormTitle}>Edit Task</h1>

          {/* General Errors */}
          {errors.general && (
            <Alert variant="danger">
              {errors.general.map((message, idx) => (
                <p key={idx}>{message}</p>
              ))}
            </Alert>
          )}

          {/* Title */}
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

          {/* Description */}
          <Form.Group controlId="description" className={formStyles.FormGroup}>
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

          {/* Category */}
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
              {!categoriesLoaded ? (
                <option disabled>Loading categories...</option>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
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

          {/* Submit Button with Loading State */}
          <Button
            type="submit"
            className={btnStyles.PrimaryButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Update Task"
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default TaskEditForm;
