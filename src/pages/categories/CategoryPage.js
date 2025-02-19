import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Category from "./Category";
import LoadingIndicator from "../../components/LoadingIndicator";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchCategoryAndTasks = async () => {
      setHasLoaded(false);
      try {
        // Step 1: Fetch Category
        const { data: categoryData } = await axiosReq.get(`/categories/${id}/`);
        // console.log("Fetched category data:", categoryData);
        setCategory(categoryData);

        // Step 2: Fetch Tasks using task_ids
        if (categoryData.task_ids.length > 0) {
          const { data: taskData } = await axiosReq.get(
            `/tasks/?ids=${categoryData.task_ids.join(",")}`
          );
          // console.log("Fetched tasks:", taskData.results);
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
  }, [id]);

  return !hasLoaded ? (
    <LoadingIndicator spinner message="Loading category..." />
  ) : !category ? (
    <p>Category not found.</p>
  ) : (
    <Category category={category} tasks={tasks} />
  );
};

export default CategoryPage;
