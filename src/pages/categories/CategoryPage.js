import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Category from "./Category";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndTasks = async () => {
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
        setLoading(false);
      }
    };

    fetchCategoryAndTasks();
  }, [id]);

  if (loading) return <p>Loading category...</p>;
  if (!category) return <p>Category not found.</p>;

  return <Category category={category} tasks={tasks} />;
};

export default CategoryPage;
