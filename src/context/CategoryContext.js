import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { useSearch } from "./SearchContext";

// Create context for category state
export const CategoryContext = createContext();
export const SetCategoryContext = createContext();
export const RefreshCategoryContext = createContext();
export const RemoveCategoryContext = createContext();

// Custom hooks to access the category list and setter function
export const useCategories = () => useContext(CategoryContext);
export const useSetCategories = () => useContext(SetCategoryContext);
export const useRefreshCategories = () => useContext(RefreshCategoryContext);
export const useRemoveCategory = () => useContext(RemoveCategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const currentUser = useCurrentUser();
  const searchQuery = useSearch();

  /**
   * Fetch the user's categories on component mount.
   * If the user has categories, store them in state.
   */
  const fetchCategories = useCallback(async () => {
    if (!currentUser) {
      setCategories(null);
      return;
    }

    try {
      const url = searchQuery
        ? `/categories/?search=${encodeURIComponent(searchQuery)}`
        : "/categories/";
      const { data } = await axiosReq.get(url);
      setCategories(data.results);
    } catch (err) {
      console.error("CategoryProvider - API Error:", err);
      setCategories([]);
    }
  }, [currentUser, searchQuery]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const removeCategory = useCallback((categoryId) => {
    setCategories((prevCategories) =>
      prevCategories
        ? prevCategories.filter((cat) => cat.id !== categoryId)
        : []
    );
  }, []);

  return (
    <CategoryContext.Provider value={categories}>
      <SetCategoryContext.Provider value={setCategories}>
        <RefreshCategoryContext.Provider value={fetchCategories}>
          <RemoveCategoryContext.Provider value={removeCategory}>
            {children}
          </RemoveCategoryContext.Provider>
        </RefreshCategoryContext.Provider>
      </SetCategoryContext.Provider>
    </CategoryContext.Provider>
  );
};
