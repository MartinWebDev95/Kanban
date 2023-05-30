import { useEffect, useState } from 'react';
import useDatabaseContext from '../hooks/useDatabaseContext';
import getTasks from '../services/getTasks';
import ListOfTasks from './ListOfTasks';
import getTasksNumberByStatus from '../helpers/getTasksNumberByStatus';
import BoardModal from './BoardModal';
import NoStatus from './NoStatus';

function ListOfStatus({ taskStatus }) {
  const {
    tasks, setTasks, selectedBoard,
  } = useDatabaseContext();
  const [openEditBoardModal, setOpenEditBoardModal] = useState(false);

  useEffect(() => {
    if (selectedBoard) {
      getTasks(selectedBoard)
        .then((item) => {
          setTasks(item);
        });
    }
  }, []);

  return (
    taskStatus.length === 0
      ? (
        <NoStatus />
      ) : (
        <>
          <ul className="grid grid-flow-col auto-cols-min h-full w-full gap-4">
            {taskStatus.map((status) => (
              <li
                key={status?.id}
                className="font-semibold text-gray-500 text-sm tracking-widest w-72"
              >
                <span>
                  {/* Return the task number of each status */}
                  {getTasksNumberByStatus({ tasks, status })}
                </span>

                <ListOfTasks tasks={tasks} status={status} />

              </li>
            ))}

            <li>
              <button
                type="button"
                className="text-gray-500 bg-gray-200 dark:bg-slate-800 text-2xl font-semibold rounded-lg hover:text-indigo-700 transition-all duration-100 ease-in-out h-full w-72 mr-4 mb-4"
                onClick={() => setOpenEditBoardModal(true)}
              >
                + New Column
              </button>
            </li>
          </ul>

          <BoardModal
            openBoardModal={openEditBoardModal}
            setOpenBoardModal={setOpenEditBoardModal}
            updating
          />
        </>
      )
  );
}

export default ListOfStatus;
