import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchCategories from "../../hooks/useFetchCategories";
import { truncateText } from "../../utils/textUtils";

import styles from "../../styles/pages/CategoriesPage.module.css";

const CategoriesPage = () => {
  const { categories, hasLoaded } = useFetchCategories();

  return (
    <Container fluid className={styles.CategoryContainer}>
      <h1 className={styles.Heading}>All Categories</h1>

      {!hasLoaded ? (
        <LoadingIndicator spinner message="Loading categories..." />
      ) : (
        <Row className={styles.CategoryRow}>
          {categories.map((category) => (
            <Col
              key={category.id}
              lg={4}
              md={6}
              xs={12}
              className={styles.CategoryCol}
            >
              <NavLink
                to={`/categories/${category.id}`}
                className={styles.CategoryLink}
              >
                <Card className={styles.CategoryCard}>
                  <Card.Body className={styles.CategoryCardBody}>
                    <Card.Title className={styles.CategoryTitle}>
                      {truncateText(category.name, 20)}
                    </Card.Title>
                    <Card.Text className={styles.CategoryDetails}>
                      <span className={styles.TaskCount}>
                        Tasks: {category.task_count}
                      </span>
                      <span className={styles.CreatedAt}>
                        Created: {category.created_at}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoriesPage;
