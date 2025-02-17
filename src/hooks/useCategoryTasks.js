import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useCategoryTasks = (taskIds) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!taskIds || taskIds.length === 0) {
        setTasks([]);
        setLoading(false);
        return;
      }

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
  }, [taskIds]);

  return { tasks, loading };
};

export default useCategoryTasks;
