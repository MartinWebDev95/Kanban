/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import useDatabaseContext from '../hooks/useDatabaseContext';

function DeleteModal({ openDeleteModal, setOpenDeleteModal }) {
  const { selectedBoard } = useDatabaseContext();

  const handleDelete = () => {
    setOpenDeleteModal(false);
  };

  const handleCancel = () => {
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

          <h2 className="text-red-500 text-xl font-semibold mb-2">Delete this board?</h2>

          <p className="text-gray-500 text-sm">
            {`Are you sure you want to delete the "${selectedBoard.name}" board? This action will remove all columns and tasks and cannot be reversed.`}
          </p>

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
              onClick={handleCancel}
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
