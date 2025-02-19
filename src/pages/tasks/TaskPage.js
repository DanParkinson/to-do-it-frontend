import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import LoadingIndicator from "../../components/LoadingIndicator";
import Task from "./Task";

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
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

    handleMount();
  }, [id]);

  return !hasLoaded ? (
    <LoadingIndicator spinner message="Loading task..." />
  ) : !task ? (
    <p>Task not found.</p>
  ) : (
    <Row className="h-100">
      <Col>
        <Task {...task} taskPage />
      </Col>
    </Row>
  );
}

export default TaskPage;
