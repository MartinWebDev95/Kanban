import useDatabaseContext from '../hooks/useDatabaseContext';
import updateTaskStatus from '../services/updateTaskStatus';

function CurrentStatus({
  task = {}, formTask = {}, setFormTask = null, updating = false,
}) {
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
    } else {
      // Get the status where the new task will appear
      setFormTask({ ...formTask, [e.target.name]: e.target.value });
    }
  };

  return (
    <label htmlFor="taskStatus" className="flex flex-col gap-2">
      <span className="text-gray-500 dark:text-white text-sm font-semibold">
        Current Status
      </span>

      <select
        name="taskStatus"
        id="taskStatus"
        onChange={handleChangeStatus}
        className="dark:text-white dark:bg-slate-800 text-black border-2 rounded-md border-gray-200 dark:border-gray-500 placeholder:text-sm text-sm font-normal w-full appearance-none p-2 bg-[url('/assets/icon-chevron-down.svg')] bg-no-repeat bg-right bg-origin-content"
      >
        {taskStatus?.map((taskState) => (
          <option
            key={taskState.id}
            value={taskState.id}
            selected={taskState.id === task.status_id}
          >
            <span>
              {taskState.name}
            </span>

          </option>
        ))}
      </select>
    </label>
  );
}

export default CurrentStatus;
