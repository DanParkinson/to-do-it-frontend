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
import { useRedirect } from "../../hooks/useRedirect";

import { axiosReq } from "../../api/axiosDefaults";
import { useRefreshCategories } from "../../context/CategoryContext";

function CategoryEditForm() {
  useRedirect("loggedOut");
  const { id } = useParams();
  const history = useHistory();
  const refreshCategories = useRefreshCategories();

  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { name } = categoryData;

  // Fetch existing category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/${id}/`);
        setCategoryData({ name: data.name });
      } catch (err) {
        console.error("Error fetching category:", err);
        history.push("/categories");
      }
    };

    fetchCategory();
  }, [id, history]);

  const handleChange = (event) => {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    formData.append("name", name);

    try {
      await axiosReq.put(`/categories/${id}/`, formData);
      refreshCategories();
      history.push(`/categories/${id}`);
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      } else {
        console.error("Error updating category:", err);
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
          <h1 className={formStyles.FormTitle}>Edit Category</h1>

          {/* General Errors */}
          {errors.general && (
            <Alert variant="danger">
              {errors.general.map((message, idx) => (
                <p key={idx}>{message}</p>
              ))}
            </Alert>
          )}

          {/* Name */}
          <Form.Group controlId="name" className={formStyles.FormGroup}>
            <Form.Label className="d-none">Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={handleChange}
              name="name"
              className={formStyles.FormControl}
            />
          </Form.Group>
          {errors?.name?.map((message, idx) => (
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
              "Update Category"
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CategoryEditForm;
