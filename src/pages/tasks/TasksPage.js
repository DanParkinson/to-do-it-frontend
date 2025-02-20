import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchTasks from "../../hooks/useFetchTasks";
import { useTaskFilters } from "../../context/TaskFilterContext";
import { truncateText } from "../../utils/textUtils";

import styles from "../../styles/pages/TasksPage.module.css";

// **Predefined order for grouping**
const GROUP_PRIORITY_ORDER = ["High", "Medium", "Low"];
const GROUP_STATUS_ORDER = ["Overdue", "Pending", "In Progress", "Completed"];
const GROUP_DUE_DATE_ORDER = [
  "Within a Week",
  "Within a Month",
  "Later",
  "No Due Date",
];

const TasksPage = () => {
  const { tasks, hasLoaded } = useFetchTasks();
  const { groupBy } = useTaskFilters();

  // Function to group tasks
  const groupTasks = (tasks, groupBy) => {
    if (!tasks) return [];

    if (groupBy === "None") {
      return [{ group: "All Tasks", tasks }];
    }

    const groupedTasks = tasks.reduce((groups, task) => {
      let key;
      if (groupBy === "Status") key = task.status;
      else if (groupBy === "Priority") key = task.priority;
      else if (groupBy === "Due Date") key = getDueDateGroup(task.due_date);
      else key = "Other";

      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
      return groups;
    }, {});

    // Convert object to array format for rendering
    let groupedArray = Object.entries(groupedTasks).map(([group, tasks]) => ({
      group,
      tasks,
    }));

    // **Sort groups based on predefined order**
    if (groupBy === "Status") {
      groupedArray.sort(
        (a, b) =>
          GROUP_STATUS_ORDER.indexOf(a.group) -
          GROUP_STATUS_ORDER.indexOf(b.group)
      );
    } else if (groupBy === "Priority") {
      groupedArray.sort(
        (a, b) =>
          GROUP_PRIORITY_ORDER.indexOf(a.group) -
          GROUP_PRIORITY_ORDER.indexOf(b.group)
      );
    } else if (groupBy === "Due Date") {
      groupedArray.sort(
        (a, b) =>
          GROUP_DUE_DATE_ORDER.indexOf(a.group) -
          GROUP_DUE_DATE_ORDER.indexOf(b.group)
      );
    }

    return groupedArray;
  };

  // Helper function for due date grouping
  const getDueDateGroup = (dueDate) => {
    if (!dueDate) return "No Due Date";
    const due = new Date(dueDate);
    const now = new Date();
    const oneWeek = new Date(now);
    oneWeek.setDate(now.getDate() + 7);
    const oneMonth = new Date(now);
    oneMonth.setMonth(now.getMonth() + 1);

    if (due <= oneWeek) return "Within a Week";
    if (due <= oneMonth) return "Within a Month";
    return "Later";
  };

  // Apply grouping logic
  const groupedTasks = groupTasks(tasks, groupBy);

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
                              {task.due_date || "N/A"}
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
