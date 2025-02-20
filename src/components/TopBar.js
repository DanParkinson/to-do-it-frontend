import React from "react";
import styles from "../styles/components/TopBar.module.css";
import SearchBar from "./SearchBar";
import TaskFilterControls from "./TaskFIlterControls";

const TopBar = () => {
  return (
    <header className={styles.TopBar}>
      <SearchBar placeholder="Search To-Do-It" />
      <TaskFilterControls />
    </header>
  );
};

export default TopBar;
