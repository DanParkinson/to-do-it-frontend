import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchTasks from "../../hooks/useFetchTasks";
import { useTaskFilters } from "../../context/TaskFilterContext";
import { truncateText } from "../../utils/textUtils";
import { groupTasks, sortTasks } from "../../utils/taskGroupingAndSorting";

import styles from "../../styles/pages/TasksPage.module.css";

const TasksPage = () => {
  const { tasks, hasLoaded } = useFetchTasks(false);
  const { groupBy, sortBy, order } = useTaskFilters();

  // Apply grouping & sorting logic
  const groupedTasks = groupTasks(tasks, groupBy).map(({ group, tasks }) => ({
    group,
    tasks: [...tasks].sort((a, b) => sortTasks(a, b, sortBy, order)), // Sort tasks inside groups
  }));

  return (
    <Container fluid className={styles.TaskContainer}>
      {!hasLoaded ? (
        <LoadingIndicator spinner message="Loading tasks..." />
      ) : (
        <>
          {groupedTasks.map(({ group, tasks }) => (
            <div key={group} className={styles.GroupContainer}>
              <h2 className={styles.GroupHeading}>{group}</h2>

              <Row className={styles.TaskRow}>
                {tasks.map((task) => (
                  <Col
                    key={task.id}
                    lg={4}
                    md={6}
                    xs={12}
                    className={styles.TaskCol}
                  >
                    <NavLink
                      to={`/tasks/${task.id}`}
                      className={styles.TaskLink}
                    >
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
                            <span className={styles.TaskStatus}>
                              {" "}
                              {task.status}
                            </span>
                            <span className={styles.TaskPriority}>
                              {task.priority}
                            </span>
                            <span className={styles.TaskDueDate}>
                              Due Date: {task.due_date || "N/A"}
                            </span>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </NavLink>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </>
      )}
    </Container>
  );
};

export default TasksPage;
