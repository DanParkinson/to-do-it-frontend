import { useState } from "react";

const useToggle = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (Id) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(Id)
        ? prevExpanded.filter((item) => item !== Id)
        : [...prevExpanded, Id]
    );
  };

  return { expandedItems, toggleItem };
};

export default useToggle;
