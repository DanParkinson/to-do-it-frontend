import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Task.module.css";

const Task = (props) => {
  const {
    id,
    owner,
    title,
    description,
    category_name,
    priority,
    status,
    due_date,
    created_at,
    updated_at,
  } = props;

  return (
    <Container fluid className={styles.TaskContainer}>
      <Card className={styles.TaskCard}>
        <Card.Body>
          <h1 className={styles.TaskTitle}>{title}</h1>
          {/* Row for Main Content */}
          <Row>
            {/* Left Side: Description & Dates */}
            <Col>
              <Card.Text>{description || "No description"}</Card.Text>
              <Card.Text>
                <strong>Created At:</strong> {created_at}
              </Card.Text>
              <Card.Text>
                <strong>Updated At:</strong> {updated_at}
              </Card.Text>
            </Col>

            {/* Right Side: Category, Status, Priority, Due Date */}
            <Col>
              <Card.Text>
                <strong>Category:</strong> {category_name || "Uncategorized"}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {status}
              </Card.Text>
              <Card.Text>
                <strong>Priority:</strong> {priority}
              </Card.Text>
              <Card.Text>
                <strong>Due Date:</strong> {due_date || "No due date set"}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Task;
