import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Custom hook to fetch and map tasks to their respective categories.
 * Returns an object where category IDs map to their associated tasks.
 */
const useCategoryTaskMap = (categories) => {
  const [categoryTaskMap, setCategoryTaskMap] = useState({});

  useEffect(() => {
    const fetchTasksForCategories = async () => {
      if (!categories || categories.length === 0) return;

      try {
        // Extract all task IDs from all categories
        const allTaskIds = categories.flatMap((category) => category.task_ids);
        if (allTaskIds.length === 0) return;

        // Fetch all tasks in one API call
        const { data } = await axiosReq.get(
          `/tasks/?ids=${allTaskIds.join(",")}`
        );

        // Organize tasks by category ID
        const taskMapping = {};
        categories.forEach((category) => {
          taskMapping[category.id] = data.results.filter((task) =>
            category.task_ids.includes(task.id)
          );
        });

        setCategoryTaskMap(taskMapping);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasksForCategories();
  }, [categories]);

  return categoryTaskMap;
};

export default useCategoryTaskMap;
