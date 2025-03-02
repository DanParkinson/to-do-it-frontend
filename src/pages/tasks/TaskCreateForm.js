import { useState } from "react";

import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/pages/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import formStyles from "../../styles/general/Forms.module.css";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetCategories } from "../../context/CategoryContext";
import useFetchCategories from "../../hooks/useFetchCategories";
import { useRedirect } from "../../hooks/useRedirect";

function TaskCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const { categories, hasLoaded } = useFetchCategories();

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
        <h1 className={formStyles.FormTitle}>Create a Task</h1>
        {/* Title & Options - Side by side on large screens, stacked on small screens */}
        <Form.Group controlId="title" className={formStyles.FormGroup}>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
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

        <Form.Group controlId="description" className={formStyles.FormGroup}>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            as="textarea"
            id="description"
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
        <Form.Group controlId="category" className={formStyles.FormGroup}>
          <Form.Label htmlFor="category">Category</Form.Label>
          <Form.Control
            as="select"
            id="category"
            value={category}
            onChange={handleChange}
            name="category"
            className={formStyles.FormControl}
          >
            <option value="">Select a Category</option>
            {!hasLoaded ? (
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
          <Form.Label htmlFor="due_date">Due Date</Form.Label>
          <Form.Control
            type="date"
            id="due_date"
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
          <Form.Label htmlFor="status">Status</Form.Label>
          <Form.Control
            as="select"
            id="status"
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
          <Form.Label htmlFor="priority">Priority</Form.Label>
          <Form.Control
            as="select"
            id="priority"
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

        {/* Submit Button */}
        <Button type="submit" className={btnStyles.PrimaryButton}>
          Create Task
        </Button>
      </Form>
    </Container>
  );
}

export default TaskCreateForm;
