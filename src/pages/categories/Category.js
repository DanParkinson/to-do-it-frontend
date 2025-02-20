import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../../styles/pages/CategoryPage.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import { truncateText } from "../../utils/textUtils";

const Category = ({ category, tasks }) => {
  return (
    <Container fluid className={styles.CategoryContainer}>
      {/* Back Button */}
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

      {/* Category Title */}
      <Row className={styles.TitleRow}>
        <Col className={styles.TitleCol}>
          <h1 className={styles.Title}>{category.name}</h1>
        </Col>
      </Row>

      {/* Category Details */}
      <Row className={styles.DetailsRow}>
        <Col className={styles.DetailsCol}>
          <p>
            <strong>Task Count:</strong> {category.task_count}
          </p>
          <p>
            <strong>Created At:</strong> {category.created_at}
          </p>
        </Col>
      </Row>

      {/* Tasks List */}
      <h2 className={styles.TaskHeading}>Tasks in this Category</h2>
      <Row className={styles.TaskRow}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col key={task.id} lg={4} md={6} xs={12} className={styles.TaskCol}>
              <NavLink to={`/tasks/${task.id}`} className={styles.TaskLink}>
                <Card className={styles.TaskCard}>
                  <Card.Body className={styles.TaskCardBody}>
                    <Card.Title className={styles.TaskTitle}>
                      {truncateText(task.title, 15)}
                    </Card.Title>
                    <Card.Text className={styles.TaskDetails}>
                      <span className={styles.TaskStatus}> {task.status}</span>
                      <span className={styles.TaskPriority}>
                        {task.priority}
                      </span>
                      <span className={styles.TaskDueDate}>
                        {task.due_date || "N/A"}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          ))
        ) : (
          <p className={styles.NoTasks}>No tasks in this category.</p>
        )}
      </Row>

      <Row className={styles.ButtonRow}>
        <Col className={styles.ButtonCol}>
          <Button className={btnStyles.PrimaryButton}>Edit</Button>
          <Button className={btnStyles.DeleteButton}>Delete</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
