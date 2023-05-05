function Task({ task }) {
  return (
    <button
      type="button"
      className="dark:bg-slate-800 bg-white p-4 rounded-lg flex flex-col gap-2 shadow-lg group w-full"
    >
      <h2 className="dark:text-white text-black font-semibold text-left group-hover:text-indigo-700 transition-all duration-150 ease-in-out">
        {task.name}
      </h2>

      <p className="text-gray-500 font-semibold text-sm">
        1 of 3 subtasks
      </p>
    </button>
  );
}

export default Task;
