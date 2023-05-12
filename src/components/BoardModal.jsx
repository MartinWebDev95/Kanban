/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import ListOfInputs from './ListOfInputs';
import useBoards from '../hooks/useBoards';
import useTasksStatus from '../hooks/useTasksStatus';

function BoardModal({
  openBoardModal, setOpenBoardModal, updating = false,
}) {
  const { addOrUpdateBoards, nameBoard, setNameBoard } = useBoards({ openBoardModal, updating });
  const {
    addOrUpdateTasksStatus, inputs, setInputs,
  } = useTasksStatus({ openBoardModal, updating });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updating) {
      const newBoardId = await addOrUpdateBoards();

      await addOrUpdateTasksStatus({ boardId: newBoardId });
    } else {
      await addOrUpdateBoards();
    }

    setOpenBoardModal(false);
  };

  const handleCloseBoardModal = (e) => {
    if (e.target.ariaLabel === 'newBoard-modal') {
      setOpenBoardModal(false);
    }
  };

  return (
    openBoardModal && (
      <div
        className="grid place-items-center bg-black/50 absolute z-30 top-0 left-0 bottom-0 w-screen h-screen py-8"
        aria-label="newBoard-modal"
        onClick={handleCloseBoardModal}
      >
        <form
          className="bg-white dark:bg-slate-800 rounded-md w-4/5 h-fit px-8 py-8 lg:w-2/5 flex flex-col gap-8 overflow-y-scroll scrollbar-hide"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black dark:text-white font-semibold text-lg text-left">
            {updating ? 'Edit Board' : 'Add New Board'}
          </h2>

          <label htmlFor="taskName" className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-white text-sm font-semibold text-left">
              Board Name
            </span>

            <input
              type="text"
              name="taskName"
              id="taskName"
              defaultValue={nameBoard}
              placeholder="e.g. Product Launch"
              className="dark:bg-slate-800 border-2 rounded-md py-2 px-2 border-gray-200 dark:border-gray-500 text-black dark:text-white text-sm"
              onChange={(e) => setNameBoard(e.target.value)}
            />
          </label>

          <ListOfInputs
            inputs={inputs}
            setInputs={setInputs}
          />

          <button
            type="submit"
            className="w-full rounded-full bg-indigo-700 text-white py-2 font-semibold lg:hover:bg-indigo-500 transition-all duration-300 ease-in-out"
          >
            {updating ? 'Save Changes' : 'Create Board'}
          </button>
        </form>
      </div>
    )
  );
}

export default BoardModal;
