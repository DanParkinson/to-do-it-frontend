import React from "react";
import { useCategories } from "../context/CategoryContext";
import { useCurrentUser } from "../context/CurrentUserContext";
import CategoryList from "./CategoryList";

const SideBar = () => {
  const categories = useCategories();
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return (
      <aside>
        <p>Sign in to start organising!</p>
      </aside>
    );
  }

  if (categories === null) {
    return (
      <aside>
        <p>Loading...</p>
      </aside>
    );
  }

  return (
    <aside>
      <CategoryList categories={categories} />
    </aside>
  );
};

export default SideBar;
