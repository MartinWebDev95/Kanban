import updateDoneSubtask from '../services/updateDoneSubtask';

function ListOfSubtasks({ subtasks, setSubtasks }) {
  const handleCheckedSubtask = (e) => {
    // Update the table column in the database
    subtasks.forEach(async (subtask) => {
      if (subtask.id === Number(e.target.id)) {
        await updateDoneSubtask({
          idSubtask: subtask.id,
          doneSubtask: !subtask.done,
        });
      }
    });

    // Update done property in the state
    const newSubtasksState = subtasks.map((subtask) => {
      if (subtask.id === Number(e.target.id)) {
        return { ...subtask, done: !subtask.done };
      }

      return subtask;
    });

    setSubtasks(newSubtasksState);
  };

  return (
    <div>
      <h3 className="text-gray-500 font-semibold text-xs lg:text-sm mb-4 tracking-widest">
        {`Subtasks (${subtasks.filter((subtask) => subtask.done).length} of ${subtasks.length})`}
      </h3>

      <ul>
        {subtasks.map((subtask) => (
          <li key={subtask.id} className="mb-2">
            <label
              htmlFor={`subtask-${subtask.id}`}
              className={`${subtask.done ? 'line-through dark:text-gray-500 text-gray-500' : 'dark:text-white text-black'} flex items-center gap-3 rounded-lg dark:bg-slate-900 bg-gray-100 p-3 text-xs lg:text-sm font-semibold hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-indigo-900 transition-all duration-100 ease-in-out`}
            >
              <input
                type="checkbox"
                name={`subtask-${subtask.id}`}
                id={`${subtask.id}`}
                onClick={handleCheckedSubtask}
                checked={subtask.done}
                className="w-4 h-4"
                readOnly
              />

              <p className="w-full">
                {subtask.name}
              </p>

            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfSubtasks;
