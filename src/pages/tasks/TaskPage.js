import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import LoadingIndicator from "../../components/LoadingIndicator";

import styles from "../../styles/pages/TaskPage.module.css";
import btnStyles from "../../styles/general/Button.module.css";

function TaskPage() {
  const { id } = useParams();
  const history = useHistory();
  const [task, setTask] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

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
      {/* Back Button */}
      <Row className={styles.BackButtonRow}>
        <Col className={styles.BackButtonCol}>
          <Button
            variant="link"
            className={btnStyles.BackIcon}
            onClick={() => history.push("/tasks")}
          >
            <i className="fa-regular fa-circle-left"></i>
          </Button>
        </Col>
      </Row>

      {/* Task Title */}
      <Row className={styles.TitleRow}>
        <Col className={styles.TitleCol}>
          <h1 className={styles.Title}>{task.title}</h1>
        </Col>
      </Row>

      {/* Task Description */}
      <Row className={styles.DescriptionRow}>
        <Col className={styles.DescriptionCol}>
          <p className={styles.DescriptionText}>
            {task.description || "No description provided."}
          </p>
        </Col>
      </Row>

      {/* Task Details (Category, Status, Priority, Due Date) */}
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

      {/* Action Buttons (Edit & Delete) */}
      <Row className={styles.ButtonRow}>
        <Col>
          <Button className={btnStyles.PrimaryButton}>Edit</Button>
          <Button className={btnStyles.DeleteButton}>Delete</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskPage;
