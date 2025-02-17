import { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/CategoryCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetCategories } from "../../context/CategoryContext";

function CategoryCreateForm() {
  const [errors, setErrors] = useState({});
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const { name } = categoryData;
  const history = useHistory();
  const setCategories = useSetCategories();

  const handleChange = (event) => {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    try {
      const { data } = await axiosReq.post("/categories/", formData);
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories, data];
        return updatedCategories;
      });

      history.push("/");
    } catch (err) {
      console.log("Error response status:", err.response?.status);
      console.log("Error response data:", err.response?.data);

      if (err.response?.status === 400) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container fluid className={styles.CategoryCreateContainer}>
      <Row
        className={`justify-content-center align-items-center ${styles.RowContainer}`}
      >
        <Col xs={12} md={10} lg={8}>
          <Form onSubmit={handleSubmit}>
            <h1 className={styles.FormTitle}>Create a Category</h1>

            {/* Category Name */}
            <Form.Group controlId="name" className={styles.FormGroup}>
              <Form.Label className="d-none">Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                className={styles.FormControl}
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Submit Button */}
            <Button type="submit" className={btnStyles.PrimaryButton}>
              Create Category
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryCreateForm;
