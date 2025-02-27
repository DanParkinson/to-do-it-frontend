import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useSearch } from "../context/SearchContext";

const useFetchTasks = (completed = false) => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const searchQuery = useSearch();

  useEffect(() => {
    const fetchTasks = async () => {
      setHasLoaded(false);
      try {
        let endpoint = completed ? "/archive" : "/tasks/";
        let params = [];

        if (searchQuery) {
          params.push(`search=${encodeURIComponent(searchQuery)}`);
        }
        if (params.length > 0) {
          endpoint += `?${params.join("&")}`;
        }

        const { data } = await axiosReq.get(endpoint);
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchTasks();
  }, [completed, searchQuery]);

  return { tasks, hasLoaded, setTasks };
};

export default useFetchTasks;
