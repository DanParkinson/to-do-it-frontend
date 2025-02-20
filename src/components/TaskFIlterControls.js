import React, { useState } from "react";
import { Dropdown, Button, Form } from "react-bootstrap";
import styles from "../styles/components/TaskFilterControls.module.css";

const TaskFilterControls = () => {
  const [groupBy, setGroupBy] = useState("None");
  const [sortBy, setSortBy] = useState("Title");
  const [order, setOrder] = useState("Ascending");

  const handleApplyFilters = () => {
    console.log("Applied Filters:", { groupBy, sortBy, order });
    // You can add a function to pass selected filters to tasks page
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.FilterDropdown}>
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.FilterMenu}>
        {/* Group By Section */}
        <Dropdown.Header>Group By</Dropdown.Header>
        <Form>
          {["None", "Status", "Priority", "Due Date"].map((option) => (
            <Form.Check
              key={option}
              type="radio"
              label={option}
              name="groupBy"
              checked={groupBy === option}
              onChange={() => setGroupBy(option)}
              className={styles.RadioOption}
            />
          ))}
        </Form>

        <Dropdown.Divider />

        {/* Sort By Section */}
        <Dropdown.Header>Sort By</Dropdown.Header>
        <Form>
          {["Title", "Priority", "Due Date"].map((option) => (
            <Form.Check
              key={option}
              type="radio"
              label={option}
              name="sortBy"
              checked={sortBy === option}
              onChange={() => setSortBy(option)}
              className={styles.RadioOption}
            />
          ))}
        </Form>

        <Dropdown.Divider />

        {/* Order Section */}
        <Dropdown.Header>Order</Dropdown.Header>
        <Form>
          {["Ascending", "Descending"].map((option) => (
            <Form.Check
              key={option}
              type="radio"
              label={option}
              name="order"
              checked={order === option}
              onChange={() => setOrder(option)}
              className={styles.RadioOption}
            />
          ))}
        </Form>

        <Dropdown.Divider />

        {/* Apply Button Inside Dropdown */}
        <Button onClick={handleApplyFilters} className={styles.ApplyButton}>
          Apply
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TaskFilterControls;
