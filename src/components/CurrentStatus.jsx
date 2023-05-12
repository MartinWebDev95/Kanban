import useDatabaseContext from '../hooks/useDatabaseContext';

function CurrentStatus({ task = {} }) {
  const { taskStatus } = useDatabaseContext();

  const handleChangeStatus = () => {

  };

  return (
    <label htmlFor="currentStatus" className="flex flex-col gap-2">
      <span className="text-gray-500 dark:text-white text-sm font-semibold">
        Current Status
      </span>

      <select
        name="currentStatus"
        id="currentStatus"
        onChange={handleChangeStatus}
        className="dark:text-white dark:bg-slate-800 text-black border-2 rounded-md py-2 px-2 border-gray-200 dark:border-gray-500 placeholder:text-sm text-sm font-normal"
      >
        {taskStatus?.map((taskState) => (
          <option
            key={taskState.id}
            defaultValue={taskState.id}
            selected={taskState.id === task.status_id}
          >
            {taskState.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CurrentStatus;
