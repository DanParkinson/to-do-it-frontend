import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchTasks from "../../hooks/useFetchTasks";
import { truncateText } from "../../utils/textUtils";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import useTaskDeletion from "../../hooks/useTaskDeletion";

import styles from "../../styles/pages/TasksPage.module.css";
import btnStyles from "../../styles/general/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

const CompletedTasksPage = () => {
  useRedirect("loggedOut");
  // Fetch archived (completed) tasks using the "archive" flag
  const { tasks, hasLoaded, setTasks } = useFetchTasks(true);
  const {
    showDeleteModal,
    taskToDelete,
    setShowDeleteModal,
    handleDeleteClick,
    handleConfirmDelete,
  } = useTaskDeletion(setTasks);

  return (
    <Container fluid className={styles.TaskContainer}>
      <h1 className={styles.Heading}>Archived Tasks</h1>

      {!hasLoaded ? (
        <LoadingIndicator spinner message="Loading archived tasks..." />
      ) : tasks.length === 0 ? (
        <p className={styles.NoTasks}>No archived tasks available.</p>
      ) : (
        <>
          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            taskTitle={taskToDelete?.title}
          />
          <Row className={styles.TaskRow}>
            {tasks.map((task) => (
              <Col
                key={task.id}
                lg={4}
                md={6}
                xs={12}
                className={styles.TaskCol}
              >
                <NavLink to={`/tasks/${task.id}`} className={styles.TaskLink}>
                  <Card className={styles.TaskCard}>
                    <div className={styles.ButtonContainer}>
                      <NavLink
                        to={`/tasks/${task.id}/edit`}
                        className={btnStyles.EditButton}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </NavLink>
                      <Button
                        className={btnStyles.DeleteButton}
                        onClick={(e) => handleDeleteClick(e, task)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </div>
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
        </>
      )}
    </Container>
  );
};

export default CompletedTasksPage;
