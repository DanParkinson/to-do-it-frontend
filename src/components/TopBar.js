import React from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import styles from "../styles/components/TopBar.module.css";
import SearchBar from "./SearchBar";

const TopBar = () => {
  return (
    <Container>
      <Row>
        <Col>
          <SearchBar placeholder="Search To-Do-It" />
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
