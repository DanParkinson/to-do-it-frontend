import { useState } from "react";

/**
 * Custom hook to handle expandable items like category lists.
 * @returns {Object} expanded - State object tracking expanded items
 * @returns {Function} toggle - Function to toggle expansion for a given item
 */
const useExpandToggle = () => {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return { expanded, toggle };
};

export default useExpandToggle;
