import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import styles from "../styles/components/SearchBar.module.css";

/**
 * Reusable SearchBar Component
 * - Can be used in multiple places (TopBar, Sidebar, etc.)
 */
const SearchBar = ({ placeholder }) => {
  return (
    <InputGroup className={styles.SearchBar}>
      <FormControl
        type="text"
        placeholder={placeholder}
        className={styles.SearchInput}
      />
    </InputGroup>
  );
};

export default SearchBar;
