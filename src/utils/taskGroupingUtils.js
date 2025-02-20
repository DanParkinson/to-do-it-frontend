export const applyGrouping = (tasks, groupBy) => {
  if (!tasks) return [];

  if (groupBy === "None") {
    return [{ group: "All Tasks", tasks }];
  }

  // Group tasks based on the selected groupBy option
  const groupedTasks = tasks.reduce((groups, task) => {
    let key;
    if (groupBy === "Status") key = task.status;
    else if (groupBy === "Priority") key = task.priority;
    else if (groupBy === "Due Date") key = getDueDateGroup(task.due_date);
    else key = "Other";

    if (!groups[key]) groups[key] = [];
    groups[key].push(task);
    return groups;
  }, {});

  // Convert object to array format for rendering
  return Object.entries(groupedTasks).map(([group, tasks]) => ({
    group,
    tasks,
  }));
};

// Helper function for grouping by time period
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
