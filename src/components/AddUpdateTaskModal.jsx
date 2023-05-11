/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState } from 'react';

function AddUpdateTaskModal({
  openAddUpdateTaskModal, setOpenAddUpdateTaskModal, updating = false,
}) {
  const [formTask, setFormTask] = useState({
    taskName: '',
    taskDescription: '',
  });

  const handleCloseNewTaskModal = (e) => {
    if (e.target.ariaLabel === 'newTask-modal') {
      setOpenAddUpdateTaskModal(false);

      setFormTask({
        taskName: '',
        taskDescription: '',
      });
    }
  };

  const handleSubmit = () => {

  };

  return (
    openAddUpdateTaskModal && (
      <div
        className="grid place-items-center bg-black/50 absolute z-30 top-0 left-0 bottom-0 w-full h-screen py-8"
        aria-label="newTask-modal"
        onClick={handleCloseNewTaskModal}
      >
        <form
          action=""
          className="bg-white dark:bg-slate-800 rounded-md w-4/5 h-full px-8 py-8 lg:w-2/5 flex flex-col gap-8 overflow-y-scroll scrollbar-hide"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black dark:text-white font-semibold text-lg">
            {updating ? 'Edit Task' : 'Add New Task'}
          </h2>

          <label htmlFor="taskName" className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-white text-sm font-semibold">
              Task Name
            </span>

            <input
              type="text"
              name="taskName"
              id="taskName"
              placeholder="e.g. Take coffe break"
              value={formTask.taskName}
              className="dark:bg-slate-800 border-2 rounded-md py-2 px-2 border-gray-200 dark:border-gray-500 placeholder:text-sm dark:text-white text-black font-normal"
              onChange={(e) => setFormTask({ ...formTask, [e.target.name]: e.target.value })}
            />
          </label>

          <label htmlFor="description" className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-white text-sm font-semibold">
              Description
            </span>

            <textarea
              name="taskDescription"
              id="description"
              cols="30"
              rows="5"
              placeholder="e.g. It's always good to take a break. This  15 minute break will  recharge the batteries a little."
              value={formTask.taskDescription}
              className="dark:bg-slate-800 border-2 rounded-md py-2 px-2 border-gray-200 dark:border-gray-500 placeholder:text-sm dark:text-white text-black font-normal"
              onChange={(e) => setFormTask({ ...formTask, [e.target.name]: e.target.value })}
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-indigo-700 text-white py-2 font-semibold lg:hover:bg-indigo-500 transition-all duration-300 ease-in-out"
          >
            {updating ? 'Save Changes' : 'Create Task'}
          </button>
        </form>
      </div>
    )
  );
}

export default AddUpdateTaskModal;
