import ListOfTasks from './ListOfTasks';
import getTasksNumberByStatus from '../helpers/getTasksNumberByStatus';

function Status({ status, tasks }) {
  return (
    <li
      className="font-semibold text-gray-500 text-sm tracking-widest w-72"
    >

      <span>
        {/* Return the task number of each status */}
        { getTasksNumberByStatus({ tasks, status }) }
      </span>

      <ListOfTasks tasks={tasks} status={status} />
    </li>
  );
}

export default Status;
