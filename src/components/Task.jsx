import { useEffect, useState } from 'react';
import TaskModal from './TaskModal';
import getSubtasks from '../services/getSubtasks';

function Task({ task }) {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    getSubtasks({ taskId: task.id })
      .then((subtask) => {
        setSubtasks(subtask);
      });
  }, []);

  return (
    <>
      <button
        type="button"
        className="dark:bg-slate-800 bg-white p-4 rounded-lg flex flex-col gap-2 shadow-lg group w-full"
        onClick={() => setOpenTaskModal(true)}
      >
        <h2 className="dark:text-white text-black font-semibold text-left group-hover:text-indigo-700 transition-all duration-150 ease-in-out">
          {task.name}
        </h2>

        <p className="text-gray-500 font-semibold text-sm">
          {`${subtasks.filter((subtask) => subtask.done).length} of ${subtasks.length} subtasks`}
        </p>
      </button>

      <TaskModal
        openTaskModal={openTaskModal}
        setOpenTaskModal={setOpenTaskModal}
        task={task}
        subtasks={subtasks}
        setSubtasks={setSubtasks}
      />
    </>
  );
}

export default Task;
