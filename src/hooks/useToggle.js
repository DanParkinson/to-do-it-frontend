import { useState } from "react";

const useToggle = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (itemId) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(itemId)
        ? prevExpanded.filter((id) => id !== itemId)
        : [...prevExpanded, itemId]
    );
  };

  return { expandedItems, toggleItem };
};

export default useToggle;
