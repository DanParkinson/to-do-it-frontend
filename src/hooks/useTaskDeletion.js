import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useRefreshCategories } from "../context/CategoryContext";

/**
 * Custom Hook to Handle Task Deletion Across Multiple Pages.
 */
const useTaskDeletion = (setTasks) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const refreshCategories = useRefreshCategories();

  // Open the delete confirmation modal
  const handleDeleteClick = (e, task) => {
    e.preventDefault();
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  // Handle confirmed delete action
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await axiosRes.delete(`/tasks/${taskToDelete.id}/`);
      setTasks((prevTasks) =>
        prevTasks.filter((t) => t.id !== taskToDelete.id)
      );
      refreshCategories();
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  return {
    showDeleteModal,
    taskToDelete,
    setShowDeleteModal,
    handleDeleteClick,
    handleConfirmDelete,
  };
};

export default useTaskDeletion;
