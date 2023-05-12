/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import ListOfSubtasks from './ListOfSubtasks';
import SettingsModal from './SettingsModal';
import AddUpdateTaskModal from './AddUpdateTaskModal';
import DeleteModal from './DeleteModal';
import CurrentStatus from './CurrentStatus';

function TaskModal({
  openTaskModal, setOpenTaskModal, task, subtasks, setSubtasks,
}) {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openAddUpdateTaskModal, setOpenAddUpdateTaskModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCloseTaskModal = (e) => {
    if (e.target.ariaLabel === 'task-modal') {
      setOpenTaskModal(false);
    }
  };

  return (
    openTaskModal && (
      <>
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
                onClick={() => setOpenSettingsModal(!openSettingsModal)}
              >
                <img src="/assets/icon-vertical-ellipsis.svg" alt="Menu task" className="w-1" />

              </button>
            </div>

            <SettingsModal
              openSettingsModal={openSettingsModal}
              setOpenSettingsModal={setOpenSettingsModal}
              setOpenEditModal={setOpenAddUpdateTaskModal}
              setOpenDeleteModal={setOpenDeleteModal}
              isTask
            />

            {task.description !== null && (
            <p className="text-gray-500 font-semibold text-sm">{task.description}</p>
            )}

            <ListOfSubtasks
              subtasks={subtasks}
              setSubtasks={setSubtasks}
            />

            <CurrentStatus task={task} />

          </div>
        </div>

        <AddUpdateTaskModal
          openAddUpdateTaskModal={openAddUpdateTaskModal}
          setOpenAddUpdateTaskModal={setOpenAddUpdateTaskModal}
          task={task}
          subtasks={subtasks}
          updating
        />

        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          task={task}
          isTask
        />
      </>
    )
  );
}

export default TaskModal;
