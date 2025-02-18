import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

// Create context for category state
export const CategoryContext = createContext();
export const SetCategoryContext = createContext();

// Custom hooks to access the category list and setter function
export const useCategories = () => useContext(CategoryContext);
export const useSetCategories = () => useContext(SetCategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const currentUser = useCurrentUser();

  console.log("CategoryProvider - Categories:", categories);

  /**
   * Fetch the user's categories on component mount.
   * If the user has categories, store them in state.
   */
  const handleMount = async () => {
    if (!currentUser) {
      console.log(
        "CategoryProvider - No current user, setting categories to null"
      );
      setCategories(null);
      return;
    }

    try {
      const { data } = await axiosReq.get("/categories/");

      if (!data.results) {
        console.log(
          "CategoryProvider - No categories found, setting empty array"
        );
        setCategories([]);
        return;
      }

      const categoriesWithTaskIds = data.results.map((category) => ({
        ...category,
        task_ids: category.task_ids || [],
      }));
      console.log(
        "CategoryProvider - Fetched Categories:",
        categoriesWithTaskIds
      );
      setCategories(categoriesWithTaskIds);
    } catch (err) {
      console.error("CategoryProvider - API Error:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    handleMount();
  }, [currentUser]);

  return (
    <CategoryContext.Provider value={categories}>
      <SetCategoryContext.Provider value={setCategories}>
        {children}
      </SetCategoryContext.Provider>
    </CategoryContext.Provider>
  );
};
