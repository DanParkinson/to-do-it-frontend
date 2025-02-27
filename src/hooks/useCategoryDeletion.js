import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import {
  useSetCategories,
  useRefreshCategories,
} from "../context/CategoryContext";

const useCategoryDeletion = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const setCategories = useSetCategories(); // Get function from context
  const refreshCategories = useRefreshCategories();

  // Open delete confirmation modal
  const handleDeleteClick = (e, category) => {
    e.preventDefault();
    e.stopPropagation();

    if (category.name === "uncategorized") {
      alert("You cannot delete the uncategorized category.");
      return;
    }

    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  // Handle confirmed delete action
  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await axiosRes.delete(`/categories/${categoryToDelete.id}/`);

      // Update categories immediately in context
      setCategories((prevCategories) =>
        prevCategories
          ? prevCategories.filter((cat) => cat.id !== categoryToDelete.id)
          : []
      );

      // Refresh categories from API
      await refreshCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  return {
    showDeleteModal,
    categoryToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    setShowDeleteModal,
  };
};

export default useCategoryDeletion;
