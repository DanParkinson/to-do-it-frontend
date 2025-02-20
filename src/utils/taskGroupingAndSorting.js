// Predefined order for grouping
const GROUP_PRIORITY_ORDER = ["High", "Medium", "Low"];
const GROUP_STATUS_ORDER = ["Overdue", "Pending", "In Progress", "Completed"];
const GROUP_DUE_DATE_ORDER = [
  "Within a Week",
  "Within a Month",
  "Later",
  "No Due Date",
];

/**
 * Groups tasks based on the selected `groupBy` option
 * @param {Array} tasks - List of tasks
 * @param {String} groupBy - Grouping criteria ("Status", "Priority", "Due Date", or "None")
 * @returns {Array} Grouped tasks
 */

export const groupTasks = (tasks, groupBy) => {
  if (!tasks) return [];

  // Step 1: Group Tasks
  const groupedTasks = tasks.reduce((groups, task) => {
    let key;
    if (groupBy === "Status") key = task.status;
    else if (groupBy === "Priority") key = task.priority;
    else if (groupBy === "Due Date") key = getDueDateGroup(task.due_date);
    else key = "All Tasks";

    if (!groups[key]) groups[key] = [];
    groups[key].push(task);
    return groups;
  }, {});

  // Convert object to array format for rendering
  let groupedArray = Object.entries(groupedTasks).map(([group, tasks]) => ({
    group,
    tasks,
  }));

  // Step 2: Sort Groups Based on Predefined Order
  if (groupBy === "Status") {
    groupedArray.sort(
      (a, b) =>
        GROUP_STATUS_ORDER.indexOf(a.group) -
        GROUP_STATUS_ORDER.indexOf(b.group)
    );
  } else if (groupBy === "Priority") {
    groupedArray.sort(
      (a, b) =>
        GROUP_PRIORITY_ORDER.indexOf(a.group) -
        GROUP_PRIORITY_ORDER.indexOf(b.group)
    );
  } else if (groupBy === "Due Date") {
    groupedArray.sort(
      (a, b) =>
        GROUP_DUE_DATE_ORDER.indexOf(a.group) -
        GROUP_DUE_DATE_ORDER.indexOf(b.group)
    );
  }

  return groupedArray;
};

/**
 * Sorts tasks within each group based on selected criteria.
 * @param {Object} a - Task A
 * @param {Object} b - Task B
 * @param {String} sortBy - Sorting criteria ("Title", "Priority", "Due Date", "Created At")
 * @param {String} order - Sorting order ("Ascending" or "Descending")
 * @returns {Number} Sorting value
 */
export const sortTasks = (a, b, sortBy, order) => {
  const direction = order === "Ascending" ? 1 : -1;

  if (sortBy === "Title") {
    return (
      direction *
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
  }
  if (sortBy === "Priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return direction * (priorityOrder[a.priority] - priorityOrder[b.priority]);
  }
  if (sortBy === "Due Date") {
    if (!a.due_date) return 1; // No Due Date goes last
    if (!b.due_date) return -1;
    return direction * (new Date(a.due_date) - new Date(b.due_date));
  }
  return direction * (new Date(a.created_at) - new Date(b.created_at)); // Default: created_at
};

/**
 * Groups due dates into predefined categories.
 * @param {String} dueDate - The due date string
 * @returns {String} Group name
 */
const getDueDateGroup = (dueDate) => {
  if (!dueDate) return "No Due Date";
  const due = new Date(dueDate);
  const now = new Date();
  const oneWeek = new Date(now);
  oneWeek.setDate(now.getDate() + 7);
  const oneMonth = new Date(now);
  oneMonth.setMonth(now.getMonth() + 1);

  if (due <= oneWeek) return "Within a Week";
  if (due <= oneMonth) return "Within a Month";
  return "Later";
};
