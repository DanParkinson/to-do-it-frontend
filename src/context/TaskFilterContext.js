import { createContext, useContext, useState } from "react";

// Create Context
const TaskFilterContext = createContext();
const SetTaskFilterContext = createContext();

// Custom Hooks for Accessing Context
export const useTaskFilters = () => useContext(TaskFilterContext);
export const useSetTaskFilters = () => useContext(SetTaskFilterContext);

export const TaskFilterProvider = ({ children }) => {
  // State for Filters
  const [filters, setFilters] = useState({
    groupBy: "None", // Grouping: None, Status, Priority, Due Date
    sortBy: "Title", // Sorting: Title, Priority, Due Date
    order: "Ascending", // Order: Ascending, Descending
  });

  // Function to update filters
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <TaskFilterContext.Provider value={filters}>
      <SetTaskFilterContext.Provider value={updateFilters}>
        {children}
      </SetTaskFilterContext.Provider>
    </TaskFilterContext.Provider>
  );
};
