import Task from './Task';

function ListOfTasks({ tasks, status }) {
  return (
    <ul className="flex flex-col gap-4 mt-4">

      {tasks.map((task) => (
        task.statusId === status.id && (
          <Task key={task.id} task={task} />
        )
      ))}

    </ul>
  );
}

export default ListOfTasks;
