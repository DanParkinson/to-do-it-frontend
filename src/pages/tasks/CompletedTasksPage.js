import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

import LoadingIndicator from "../../components/LoadingIndicator";
import useFetchTasks from "../../hooks/useFetchTasks";
import { truncateText } from "../../utils/textUtils";
import styles from "../../styles/pages/CompletedTasksPage.module.css";

console.log("Completed tasks:");

const CompletedTasksPage = () => {
  console.log("CompletedTasksPage loaded");
  return;
  <h1>completed tasks</h1>;
};

export default CompletedTasksPage;
