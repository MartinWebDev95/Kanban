import useDatabaseContext from '../hooks/useDatabaseContext';
import updateTaskStatus from '../services/updateTaskStatus';

function CurrentStatus({ task = {}, updating = false }) {
  const { taskStatus, tasks, setTasks } = useDatabaseContext();

  const handleChangeStatus = async (e) => {
    if (updating) {
      // Update the tasks status in the database
      await updateTaskStatus({ idTask: task.id, idStatus: Number(e.target.value) });

      // Update the tasks status in the tasks state
      const newTasksState = tasks.map((item) => {
        if (item.id === task.id) {
          return { ...item, status_id: Number(e.target.value) };
        }

        return item;
      });

      setTasks(newTasksState);
    }
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
            value={taskState.id}
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
