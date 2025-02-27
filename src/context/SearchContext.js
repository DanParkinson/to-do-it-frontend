import { createContext, useContext, useState } from "react";

// Create Contexts
const SearchContext = createContext();
const SetSearchContext = createContext();

// Custom Hooks for Using Context
export const useSearch = () => useContext(SearchContext);
export const useSetSearch = () => useContext(SetSearchContext);

// Provider Component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={searchQuery}>
      <SetSearchContext.Provider value={setSearchQuery}>
        {children}
      </SetSearchContext.Provider>
    </SearchContext.Provider>
  );
};
