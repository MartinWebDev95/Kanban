function getTasksNumberByStatus({ tasks, status }) {
  return `${status.name} (${tasks.filter((task) => task.status_id === status.id).length})`;
}

export default getTasksNumberByStatus;
