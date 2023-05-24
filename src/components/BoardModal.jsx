/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import ListOfInputs from './ListOfInputs';
import useBoards from '../hooks/useBoards';
import useTasksStatus from '../hooks/useTasksStatus';

function BoardModal({
  openBoardModal, setOpenBoardModal, updating = false,
}) {
  const {
    addOrUpdateBoards, nameBoard, setNameBoard, selectedBoard, errorBoard, setErrorBoard,
  } = useBoards({ openBoardModal, updating });

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

      await addOrUpdateTasksStatus({ boardId: selectedBoard.id });
    }

    // If there is not error the modal is closed
    if (errorBoard !== '') {
      setOpenBoardModal(false);
    }
  };

  const handleCloseBoardModal = (e) => {
    if (e.target.ariaLabel === 'newBoard-modal') {
      setOpenBoardModal(false);
    }
  };

  return (
    openBoardModal && (
      <div
        className="grid place-items-center bg-black/50 absolute z-30 top-0 left-0 bottom-0 w-screen h-screen py-16"
        aria-label="newBoard-modal"
        onClick={handleCloseBoardModal}
      >
        <form
          className="bg-white dark:bg-slate-800 rounded-md w-11/12 md:w-4/5 lg:w-2/5 h-full p-7 flex flex-col gap-6 overflow-y-scroll scrollbar-hide"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black dark:text-white font-semibold text-lg text-left">
            {updating ? 'Edit Board' : 'Add New Board'}
          </h2>

          <label htmlFor="taskName" className="flex flex-col gap-2">
            <p className={`${errorBoard ? 'text-red-600' : 'text-gray-500 dark:text-white'} text-sm font-semibold text-left flex justify-between`}>
              <span>
                Board Name
              </span>
              <span className={`${errorBoard ? 'block' : 'hidden'}`}>
                {errorBoard}
              </span>
            </p>

            <input
              type="text"
              name="taskName"
              id="taskName"
              defaultValue={nameBoard}
              placeholder="e.g. Product Launch"
              className={`dark:bg-slate-800 border-2 rounded-md py-2 px-2 ${errorBoard ? 'border-red-600' : 'border-gray-200 dark:border-gray-500'} text-black dark:text-white text-sm`}
              onChange={(e) => setNameBoard(e.target.value)}
              onFocus={() => setErrorBoard('')}
            />
          </label>

          <ListOfInputs
            inputs={inputs}
            setInputs={setInputs}
            updating={updating}
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
