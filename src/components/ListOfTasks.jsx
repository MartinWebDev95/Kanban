function ListOfTasks({ tasks, status }) {
  return (
    <ul className="flex flex-col gap-4 mt-4">

      {tasks.map((task) => (
        task.statusId === status.id && (
          <li key={task.id}>{task.name}</li>
        )
      ))}

    </ul>
  );
}

export default ListOfTasks;
