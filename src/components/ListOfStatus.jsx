import { useEffect } from 'react';
import getStatus from '../services/getStatus';
import useDatabaseContext from '../hooks/useDatabaseContext';

function ListOfStatus() {
  const { selectedBoard, taskStatus, setTaskStatus } = useDatabaseContext();

  useEffect(() => {
    if (Object.keys(selectedBoard).length > 0) {
      getStatus(selectedBoard)
        .then((item) => {
          setTaskStatus(item);
        });
    }
  }, [selectedBoard]);

  return (
    <ul className="grid grid-flow-col auto-cols-min h-full w-full gap-4">

      {taskStatus.map((status) => (
        <li
          key={status.id}
          className="font-semibold text-gray-500 text-sm tracking-widest w-72"
        >
          <span>
            {status.name}
          </span>
        </li>
      ))}

      <li>
        <button
          type="button"
          className="text-gray-500 bg-gray-200 dark:bg-slate-800 text-2xl font-semibold rounded-lg hover:text-indigo-700 transition-all duration-100 ease-in-out h-full w-72 mr-4"
        >
          + New Column
        </button>
      </li>
    </ul>
  );
}

export default ListOfStatus;
