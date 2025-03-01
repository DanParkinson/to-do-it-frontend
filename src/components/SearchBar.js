import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useSetSearch } from "../context/SearchContext";
import styles from "../styles/components/SearchBar.module.css";

/**
 * Reusable SearchBar Component
 * - Can be used in multiple places (TopBar, Sidebar, etc.)
 */
const SearchBar = ({ placeholder }) => {
  const setSearchQuery = useSetSearch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <InputGroup className={styles.SearchBar}>
      <FormControl
        type="text"
        placeholder={placeholder}
        className={styles.SearchInput}
        onChange={handleSearchChange}
      />
    </InputGroup>
  );
};

export default SearchBar;
