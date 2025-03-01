import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import LoadingIndicator from "../../components/LoadingIndicator";
import { truncateText } from "../../utils/textUtils";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";
import useCategoryDeletion from "../../hooks/useCategoryDeletion";
import { useCategories } from "../../context/CategoryContext";

import styles from "../../styles/pages/CategoriesPage.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

const CategoriesPage = () => {
  useRedirect("loggedOut");
  const categories = useCategories();
  const hasLoaded = categories !== null;
  const history = useHistory();
  const {
    showDeleteModal,
    categoryToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    setShowDeleteModal,
  } = useCategoryDeletion();

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
                  {category.name !== "Uncategorized" && (
                    <div className={styles.ButtonContainer}>
                      <Button
                        className={btnStyles.EditButton}
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/categories/${category.id}/edit`);
                        }}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>

                      <Button
                        className={btnStyles.DeleteButton}
                        onClick={(e) => handleDeleteClick(e, category)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </div>
                  )}
                  <Card.Body className={styles.CategoryCardBody}>
                    <Card.Title className={styles.CategoryTitle}>
                      {truncateText(category.name, 20)}
                    </Card.Title>
                    <Card.Text className={styles.CategoryDetails}>
                      <span className={styles.TaskCount}>
                        Tasks: {category.task_count}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          ))}
        </Row>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteCategoryModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        categoryName={categoryToDelete?.name}
      />
    </Container>
  );
};

export default CategoriesPage;
