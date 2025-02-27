import { useState, useEffect, useCallback } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchCategories = useCallback(async () => {
    setHasLoaded(false);
    try {
      const { data } = await axiosReq.get("/categories/");
      setCategories(data.results);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Run on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    hasLoaded,
    setCategories,
    refreshCategories: fetchCategories,
  };
};

export default useFetchCategories;
