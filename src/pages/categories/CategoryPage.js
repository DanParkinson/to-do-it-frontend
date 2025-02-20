import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchCategory from "../../hooks/useFetchCategory";
import { useTaskFilters } from "../../context/TaskFilterContext";
import { groupTasks, sortTasks } from "../../utils/taskGroupingAndSorting";
import { truncateText } from "../../utils/textUtils";

import styles from "../../styles/pages/CategoryPage.module.css";
import btnStyles from "../../styles/general/Button.module.css";

const CategoryPage = () => {
  const { id } = useParams();
  const { category, tasks, hasLoaded } = useFetchCategory(id);
  const { groupBy, sortBy, order } = useTaskFilters();

  // Apply grouping & sorting logic
  const groupedTasks = groupTasks(tasks, groupBy).map(({ group, tasks }) => ({
    group,
    tasks: [...tasks].sort((a, b) => sortTasks(a, b, sortBy, order)), // Sort tasks inside groups
  }));

  return (
    <Container fluid className={styles.CategoryContainer}>
      {!hasLoaded ? (
        <LoadingIndicator spinner message="Loading category..." />
      ) : category ? (
        <>
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
            </Col>
          </Row>

          {/* Tasks List */}
          {tasks.length === 0 ? (
            <p className={styles.NoTasks}>No tasks in this category.</p>
          ) : (
            groupedTasks.map(({ group, tasks }) => (
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
            ))
          )}
        </>
      ) : (
        <p className={styles.NotFound}>Category not found.</p>
      )}
    </Container>
  );
};

export default CategoryPage;
