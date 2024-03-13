/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ListOfInputs from './ListOfInputs';
import useBoards from '../hooks/useBoards';
import useTasksStatus from '../hooks/useTasksStatus';
import useDatabaseContext from '../hooks/useDatabaseContext';

function BoardModal({
  openBoardModal, setOpenBoardModal, updating = false,
}) {
  const { selectedBoard } = useDatabaseContext();

  const {
    addOrUpdateBoards, register, handleSubmit, errors, reset, control,
  } = useBoards({ openBoardModal, updating });

  const {
    addOrUpdateTasksStatus, fields, append, remove,
  } = useTasksStatus({ openBoardModal, updating, control });

  const handleCloseBoardModal = (e = null) => {
    if (e.target.ariaLabel === 'newBoard-modal') {
      // Close the board modal
      setOpenBoardModal(false);

      // Reset the board name
      reset();

      // Reset the board columns
      remove();
    }
  };

  const onSubmit = async (data) => {
    const { nameBoard, taskStatus } = data;

    const newBoard = await addOrUpdateBoards({ newBoardName: nameBoard });

    await addOrUpdateTasksStatus({
      newTasksStatus: taskStatus,
      boardId: !updating ? newBoard : selectedBoard.id,
    });

    setOpenBoardModal(false);

    reset();

    remove();
  };

  return (
    openBoardModal && (
      <div
        className="grid place-items-center bg-black/50 absolute z-20 lg:z-30 top-0 left-0 bottom-0 w-screen h-screen py-16"
        aria-label="newBoard-modal"
        onClick={handleCloseBoardModal}
      >
        <form
          className="bg-white dark:bg-slate-800 rounded-md w-11/12 md:w-4/5 lg:w-2/5 h-full p-7 flex flex-col gap-6 overflow-y-scroll scrollbar-hide"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-black dark:text-white font-semibold text-lg text-left">
            {updating ? 'Edit Board' : 'Add New Board'}
          </h2>

          <label htmlFor="taskName" className="flex flex-col gap-2">
            <p className="text-gray-500 dark:text-white text-sm font-semibold text-left flex justify-between">
              <span>
                Board Name
              </span>
              {errors.nameBoard && <span className="text-red-600">This is not a correct board name</span>}
            </p>

            <input
              type="text"
              placeholder="e.g. Product Launch"
              className={`${errors.nameBoard ? 'border-red-600' : 'border-gray-200 dark:border-gray-500'} dark:bg-slate-800 border-2 rounded-md py-2 px-2 text-black dark:text-white text-sm appearance-none`}
              {...register(
                'nameBoard',
                {
                  pattern: /^[a-zA-Z0-9\-\_\,\;\.\'ÑñáéíóúÁÉÍÓÚ\s]{3,}$/,
                  required: true,
                },
              )}
            />
          </label>

          <ListOfInputs
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
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
