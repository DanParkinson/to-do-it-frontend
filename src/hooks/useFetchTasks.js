import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useFetchTasks = (completed = false) => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setHasLoaded(false);
      try {
        const endpoint = completed ? "/tasks/completed/" : "/tasks/";
        const { data } = await axiosReq.get(endpoint);
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchTasks();
  }, [completed]);

  return { tasks, hasLoaded };
};

export default useFetchTasks;
