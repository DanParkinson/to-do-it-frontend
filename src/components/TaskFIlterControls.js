import React, { useState } from "react";
import { Dropdown, Button, Form } from "react-bootstrap";
import styles from "../styles/components/TaskFilterControls.module.css";

import {
  useTaskFilters,
  useSetTaskFilters,
} from "../context/TaskFilterContext";

const TaskFilterControls = () => {
  const { groupBy, sortBy, order } = useTaskFilters();
  const setFilters = useSetTaskFilters();

  const handleApply = () => {
    setFilters({ groupBy, sortBy, order });
  };

  const handleReset = () => {
    setFilters({
      groupBy: "None",
      sortBy: "Title",
      order: "Ascending",
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.FilterDropdown}>
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.FilterMenu}>
        {/* Grouping Options */}
        <Dropdown.Header>Group By</Dropdown.Header>
        <Form>
          {["None", "Status", "Priority", "Due Date"].map((option) => (
            <Form.Check
              key={option}
              type="radio"
              label={option}
              name="grouping"
              checked={groupBy === option}
              onChange={() => setFilters({ groupBy: option })}
              className={styles.RadioOption}
            />
          ))}
        </Form>

        <Dropdown.Divider />

        {/* Sorting Options */}
        <Dropdown.Header>Sort By</Dropdown.Header>
        <Form>
          {["Title", "Priority", "Due Date"].map((option) => (
            <Form.Check
              key={option}
              type="radio"
              label={option}
              name="sortBy"
              checked={sortBy === option}
              onChange={() => setFilters({ sortBy: option })}
              className={styles.RadioOption}
            />
          ))}
        </Form>

        <Dropdown.Divider />

        {/* Order Options */}
        <Dropdown.Header>Order</Dropdown.Header>
        <Form>
          {["Ascending", "Descending"].map((option) => (
            <Form.Check
              key={option}
              type="radio"
              label={option}
              name="order"
              checked={order === option}
              onChange={() => setFilters({ order: option })}
              className={styles.RadioOption}
            />
          ))}
        </Form>

        <Dropdown.Divider />

        {/* Apply & Reset Buttons */}
        <div className={styles.ButtonContainer}>
          <Button className={styles.ApplyButton} onClick={handleApply}>
            Apply
          </Button>
          <Button className={styles.ApplyButton} onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TaskFilterControls;
