import React from "react";
import { useCategories } from "../context/CategoryContext";
import CategoryList from "./CategoryList";

const SideBar = () => {
  const categories = useCategories();
  const loading = categories.length === 0;

  return (
    <aside>
      <h2>Categories</h2>
      {loading ? <p>Loading...</p> : <CategoryList categories={categories} />}
    </aside>
  );
};

export default SideBar;
