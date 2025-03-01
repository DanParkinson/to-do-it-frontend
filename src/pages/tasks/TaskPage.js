import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import LoadingIndicator from "../../components/LoadingIndicator";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import useTaskDeletion from "../../hooks/useTaskDeletion"; //
import { useRedirect } from "../../hooks/useRedirect";

import styles from "../../styles/pages/TaskPage.module.css";
import btnStyles from "../../styles/general/Button.module.css";

function TaskPage() {
  useRedirect("loggedOut");
  const { id } = useParams();
  const history = useHistory();
  const [task, setTask] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    showDeleteModal,
    taskToDelete,
    setShowDeleteModal,
    handleDeleteClick,
    handleConfirmDelete,
  } = useTaskDeletion(() => history.push("/tasks"));

  useEffect(() => {
    const fetchTask = async () => {
      setHasLoaded(false);
      try {
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        setTask(data);
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchTask();
  }, [id]);

  if (!hasLoaded) return <LoadingIndicator spinner message="Loading task..." />;
  if (!task) return <p>Task not found.</p>;

  return (
    <Container fluid className={styles.TaskContainer}>
      {/* Header Row (Back Button, Edit & Delete Buttons) */}
      <Row className={styles.HeaderRow}>
        <Col className={styles.BackButtonCol}>
          <Button
            variant="link"
            className={btnStyles.BackIcon}
            onClick={() => history.goBack()}
          >
            <i className="fa-regular fa-circle-left"></i>
          </Button>
        </Col>

        <Col className={styles.ActionButtonsCol}>
          <Button
            className={btnStyles.EditButton}
            onClick={() => history.push(`/tasks/${task.id}/edit`)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>

          <Button
            className={btnStyles.DeleteButton}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick(e, task);
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </Button>
        </Col>
      </Row>

      {/* Task Title */}
      <Row className={styles.TitleRow}>
        <Col>
          <h1 className={styles.Title}>{task.title}</h1>
        </Col>
      </Row>

      {/* Task Details */}
      <Row className={styles.DetailsRow}>
        <Col className={styles.DetailsCol}>
          <p>
            <strong>Category:</strong> {task.category_name || "Uncategorized"}
          </p>
        </Col>
        <Col className={styles.DetailsCol}>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
        </Col>
        <Col className={styles.DetailsCol}>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
        </Col>
        <Col className={styles.DetailsCol}>
          <p>
            <strong>Due Date:</strong> {task.due_date || "No due date"}
          </p>
        </Col>
      </Row>

      {/* Task Description */}
      <Row className={styles.DescriptionRow}>
        <Col className={styles.DescriptionCol}>
          <h3>Description</h3>
          <p className={styles.DescriptionText}>
            {task.description || "No description provided."}
          </p>
        </Col>
      </Row>

      {/* Created At & Updated At */}
      <Row className={styles.TimeRow}>
        <Col className={styles.TimeCol}>
          <p>
            <strong>Created At:</strong> {task.created_at}
          </p>
          <p>
            <strong>Updated At:</strong> {task.updated_at}
          </p>
        </Col>
      </Row>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
      />
    </Container>
  );
}

export default TaskPage;
