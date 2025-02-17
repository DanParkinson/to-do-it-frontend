import React from "react";
import { useCategories } from "../context/CategoryContext";
import { useCurrentUser } from "../context/CurrentUserContext";
import CategoryList from "./CategoryList";

const SideBar = () => {
  const categories = useCategories();
  const currentUser = useCurrentUser();

  return (
    <aside>
      {!currentUser ? (
        <p>Sign in to start organising!</p>
      ) : categories === null ? (
        <p>Loading...</p>
      ) : (
        <CategoryList categories={categories} />
      )}
    </aside>
  );
};

export default SideBar;
