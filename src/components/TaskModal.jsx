/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';

function TaskModal({
  openTaskModal, setOpenTaskModal, task, subtasks,
}) {
  const [openSettingsTaskModal, setOpenSettingsTaskModal] = useState(false);

  const handleCloseTaskModal = (e) => {
    if (e.target.ariaLabel === 'task-modal') {
      setOpenTaskModal(false);
    }
  };

  return (
    openTaskModal && (
      <div
        className="grid place-items-center bg-black/50 absolute z-30 top-0 left-0 bottom-0 w-screen h-screen py-8"
        aria-label="task-modal"
        onClick={handleCloseTaskModal}
      >
        <div className="bg-white dark:bg-slate-800 rounded-md w-4/5 px-8 py-8 lg:w-2/5 flex flex-col gap-8 overflow-y-scroll scrollbar-hide tracking-normal">
          <div className="flex justify-between items-center">
            <h2 className="dark:text-white text-black font-semibold text-xl group-hover:text-indigo-700 transition-all duration-150 ease-in-out">{task.name}</h2>

            <button
              type="button"
              className="p-1"
              onClick={() => setOpenSettingsTaskModal(!openSettingsTaskModal)}
            >
              <img src="/assets/icon-vertical-ellipsis.svg" alt="Menu task" className="w-1" />

            </button>
          </div>

          {task.description !== '' && (
            <p className="text-gray-500 font-semibold text-sm">{task.description}</p>
          )}

          <ul>
            {subtasks.map((subtask) => (
              <li key={subtask.id}>{subtask.name}</li>
            ))}
          </ul>

        </div>
      </div>
    )
  );
}

export default TaskModal;
