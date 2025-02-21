import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchTasks from "../../hooks/useFetchTasks";
import { truncateText } from "../../utils/textUtils";
import styles from "../../styles/pages/TasksPage.module.css";

const CompletedTasksPage = () => {
  // Fetch archived (completed) tasks using the "archive" flag
  const { tasks, hasLoaded } = useFetchTasks("archive");

  return (
    <Container fluid className={styles.TaskContainer}>
      <h1 className={styles.Heading}>Archived Tasks</h1>

      {!hasLoaded ? (
        <LoadingIndicator spinner message="Loading archived tasks..." />
      ) : tasks.length === 0 ? (
        <p className={styles.NoTasks}>No archived tasks available.</p>
      ) : (
        <Row className={styles.TaskRow}>
          {tasks.map((task) => (
            <Col key={task.id} lg={4} md={6} xs={12} className={styles.TaskCol}>
              <NavLink to={`/tasks/${task.id}`} className={styles.TaskLink}>
                <Card className={styles.TaskCard}>
                  <Card.Body className={styles.TaskCardBody}>
                    <Card.Title className={styles.TaskTitle}>
                      {truncateText(task.title, 15)}
                    </Card.Title>
                    <Card.Text className={styles.TaskDetails}>
                      <span className={styles.TaskCategory}>
                        {truncateText(task.category_name, 15)}
                      </span>
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
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CompletedTasksPage;
