/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import useDatabaseContext from '../hooks/useDatabaseContext';
import deleteBoard from '../services/deleteBoard';
import deleteTask from '../services/deleteTask';

function DeleteModal({
  openDeleteModal, setOpenDeleteModal, task = {}, isTask = false,
}) {
  const {
    selectedBoard, setSelectedBoard, boards, setBoards, tasks, setTasks,
  } = useDatabaseContext();

  const handleDelete = async () => {
    if (isTask) {
      // Delete task in database
      await deleteTask({ idTask: task.id });

      // Update the task state without the task just deleted
      setTasks(tasks.filter((item) => item.id !== task.id));
    } else {
      // Delete board in database
      await deleteBoard(selectedBoard);

      // Update the boards state without the board just deleted
      setBoards(boards.filter((board) => board.id !== selectedBoard.id));

      // Select the first board of the list
      setSelectedBoard(boards[0]);
    }

    // Close delete modal after the operation
    setOpenDeleteModal(false);
  };

  const handleCloseDeleteModal = (e) => {
    if (e.target.ariaLabel === 'delete-modal') {
      setOpenDeleteModal(false);
    }
  };

  return (
    openDeleteModal && (
      <div
        className="absolute top-0 left-0 z-30 grid place-items-center w-full h-screen bg-black/50"
        aria-label="delete-modal"
        onClick={handleCloseDeleteModal}
      >
        <div className=" w-3/4 lg:w-2/5 bg-white dark:bg-slate-800 py-6 px-8 rounded-lg">

          {isTask ? (
            <>
              <h2 className="text-red-500 text-xl font-semibold mb-2">Delete this task?</h2>

              <p className="text-gray-500 text-sm">
                {`Are you sure you want to delete the "${task.name}" task and its subtasks? This action cannot be reversed.`}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-red-500 text-xl font-semibold mb-2">Delete this board?</h2>

              <p className="text-gray-500 text-sm">
                {`Are you sure you want to delete the "${selectedBoard.name}" board? This action will remove all columns and tasks and cannot be reversed.`}
              </p>
            </>
          )}

          <div className="flex items-center justify-between gap-4 w-full lg:w-3/4 mx-auto mt-6">
            <button
              type="button"
              className="bg-red-500 text-white font-semibold rounded-full py-2 px-4 w-full text-sm hover:bg-red-400 transition-all duration-200 ease-in-out"
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              type="button"
              className="bg-slate-100 text-indigo-700 dark:bg-white font-semibold rounded-full py-2 px-4 w-full text-sm hover:dark:bg-indigo-400 hover:bg-indigo-400 hover:text-white transition-all duration-200 ease-in-out"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteModal;
