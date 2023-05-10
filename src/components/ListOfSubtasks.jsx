function ListOfSubtasks({ subtasks }) {
  const handleCheckedSubtask = () => {

  };

  return (
    <div>
      <h3 className="text-gray-500 font-semibold text-sm mb-4 tracking-widest">
        {`Subtasks (${subtasks.filter((subtask) => subtask.done).length} of ${subtasks.length})`}
      </h3>

      <ul>
        {subtasks.map((subtask) => (
          <li key={subtask.id} className="mb-2">
            <label
              htmlFor={`subtask-${subtask.id}`}
              className={`${subtask.done ? 'line-through dark:text-gray-500 text-gray-500' : 'dark:text-white text-black'} flex items-center gap-4 rounded-lg dark:bg-slate-900 bg-gray-100 p-3 text-sm font-semibold hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-indigo-900 transition-all duration-100 ease-in-out`}
            >
              <input
                type="checkbox"
                name={`subtask-${subtask.id}`}
                id={`${subtask.id}`}
                onClick={handleCheckedSubtask}
                checked={subtask.done}
                readOnly
              />

              {subtask.name}

            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfSubtasks;
