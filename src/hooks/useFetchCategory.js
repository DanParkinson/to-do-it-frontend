import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Custom hook to fetch a category and its associated tasks.
 * @param {string} categoryId - The ID of the category to fetch.
 * @returns {Object} { category, tasks, hasLoaded }
 */
const useFetchCategory = (categoryId) => {
  const [category, setCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchCategoryAndTasks = async () => {
      setHasLoaded(false);
      try {
        // Fetch category details
        const { data: categoryData } = await axiosReq.get(
          `/categories/${categoryId}/`
        );
        setCategory(categoryData);

        // Fetch associated tasks if there are any
        if (categoryData.task_ids.length > 0) {
          const { data: taskData } = await axiosReq.get(
            `/tasks/?ids=${categoryData.task_ids.join(",")}`
          );
          setTasks(taskData.results);
        } else {
          setTasks([]); // No tasks in this category
        }
      } catch (err) {
        console.error("Error fetching category or tasks:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchCategoryAndTasks();
  }, [categoryId]);

  return { category, tasks, hasLoaded };
};

export default useFetchCategory;
