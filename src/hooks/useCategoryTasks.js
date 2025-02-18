import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

// Fetches tasks that belong to a specific category based on task IDs.
const useCategoryTasks = (taskIds, isExpanded) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isExpanded || !taskIds || taskIds.length === 0) {
        setTasks([]);
        return;
      }

      setLoading(true);
      try {
        const { data } = await axiosReq.get(`/tasks/?ids=${taskIds.join(",")}`);
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [taskIds, isExpanded]);

  return { tasks, loading };
};

export default useCategoryTasks;
