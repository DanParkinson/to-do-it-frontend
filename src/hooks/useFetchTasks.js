import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useFetchTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setHasLoaded(false);
      try {
        const { data } = await axiosReq.get("/tasks/");
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, hasLoaded };
};

export default useFetchTasks;
