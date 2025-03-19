export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

export const filterTasks = (tasks, filter, searchTerm) => {
  return tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
}; 