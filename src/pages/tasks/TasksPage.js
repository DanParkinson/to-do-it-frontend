import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchTasks from "../../hooks/useFetchTasks";
import { useTaskFilters } from "../../context/TaskFilterContext";
import { useRefreshCategories } from "../../context/CategoryContext";
import { truncateText } from "../../utils/textUtils";
import { groupTasks, sortTasks } from "../../utils/taskGroupingAndSorting";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import useTaskDeletion from "../../hooks/useTaskDeletion"; //

import styles from "../../styles/pages/TasksPage.module.css";
import btnStyles from "../../styles/general/Button.module.css";

const TasksPage = () => {
  const history = useHistory();
  const { tasks, hasLoaded, setTasks } = useFetchTasks(false);
  const { groupBy, sortBy, order } = useTaskFilters();
  const refreshCategories = useRefreshCategories();
  const {
    showDeleteModal,
    taskToDelete,
    setShowDeleteModal,
    handleDeleteClick,
    handleConfirmDelete,
  } = useTaskDeletion(setTasks);

  // Apply grouping & sorting logic
  const groupedTasks = groupTasks(tasks, groupBy).map(({ group, tasks }) => ({
    group,
    tasks: [...tasks].sort((a, b) => sortTasks(a, b, sortBy, order)), // Sort tasks inside groups
  }));

  return (
    <Container fluid className={styles.TaskContainer}>
      {!hasLoaded ? (
        <LoadingIndicator spinner message="Loading tasks..." />
      ) : tasks.length === 0 ? (
        <>
          <h1 className={styles.Heading}>All Tasks</h1>
          <p className={styles.NoTasks}>No tasks available.</p>
        </>
      ) : (
        <>
          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            taskTitle={taskToDelete?.title}
          />

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
                          <Row className={styles.ButtonRow}>
                            <Button
                              className={btnStyles.EditButton}
                              onClick={(e) => {
                                e.preventDefault();
                                history.push(`/tasks/${task.id}/edit`);
                              }}
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
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
                          </Row>
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
