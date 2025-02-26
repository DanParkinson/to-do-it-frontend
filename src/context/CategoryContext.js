import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

// Create context for category state
export const CategoryContext = createContext();
export const SetCategoryContext = createContext();
export const RefreshCategoryContext = createContext();

// Custom hooks to access the category list and setter function
export const useCategories = () => useContext(CategoryContext);
export const useSetCategories = () => useContext(SetCategoryContext);
export const useRefreshCategories = () => useContext(RefreshCategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const currentUser = useCurrentUser();

  /**
   * Fetch the user's categories on component mount.
   * If the user has categories, store them in state.
   */
  const fetchCategories = async () => {
    if (!currentUser) {
      setCategories(null);
      return;
    }

    try {
      const { data } = await axiosReq.get("/categories/");
      setCategories(data.results);
    } catch (err) {
      console.error("CategoryProvider - API Error:", err);
      setCategories([]);
    } finally {
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentUser]);

  return (
    <CategoryContext.Provider value={categories}>
      <SetCategoryContext.Provider value={setCategories}>
        <RefreshCategoryContext.Provider value={fetchCategories}>
          {children}
        </RefreshCategoryContext.Provider>
      </SetCategoryContext.Provider>
    </CategoryContext.Provider>
  );
};
