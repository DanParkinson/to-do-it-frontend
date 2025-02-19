import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import LoadingIndicator from "../components/LoadingIndicator";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/TasksPage.module.css";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setHasLoaded(false);
      try {
        const { data } = await axiosReq.get("/tasks/");
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchTasks();
  }, []);
  return (
    <Container fluid className={styles.TaskContainer}>
      <h1 className={styles.Heading}>All Tasks</h1>

      {!hasLoaded ? (
        <LoadingIndicator spinner message="Loading tasks..." />
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
                        {" "}
                        {truncateText(task.category_name, 15)}
                      </span>
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
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TasksPage;
