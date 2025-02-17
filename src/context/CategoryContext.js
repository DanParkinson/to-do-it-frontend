import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

// Create context for category state
export const CategoryContext = createContext();
export const SetCategoryContext = createContext();

// Custom hooks to access the category list and setter function
export const useCategories = () => useContext(CategoryContext);
export const useSetCategories = () => useContext(SetCategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  /**
   * Fetch the user's categories on component mount.
   * If the user has categories, store them in state.
   */
  const handleMount = async () => {
    try {
      const { data } = await axiosReq.get("/categories/");
      setCategories(data.results);
    } catch (err) {
      console.error("CategoryProvider - API Error:", err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CategoryContext.Provider value={categories}>
      <SetCategoryContext.Provider value={setCategories}>
        {children}
      </SetCategoryContext.Provider>
    </CategoryContext.Provider>
  );
};
