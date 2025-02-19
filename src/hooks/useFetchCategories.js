import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setHasLoaded(false);
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategories(data.results);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchCategories();
  }, []);

  return { categories, hasLoaded };
};

export default useFetchCategories;
