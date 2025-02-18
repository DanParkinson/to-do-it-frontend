import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        setTask(data);
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    handleMount();
  }, [id]);

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <Row className="h-100">
      <Col>
        <Task {...task} taskPage />
      </Col>
    </Row>
  );
}

export default TaskPage;
