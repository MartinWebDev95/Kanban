function getTasksNumberByStatus({ tasks, status }) {
  return `${status.name} (${tasks.filter((task) => task.statusId === status.id).length})`;
}

export default getTasksNumberByStatus;
