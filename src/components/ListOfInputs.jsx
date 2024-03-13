import useDatabaseContext from '../hooks/useDatabaseContext';
import deleteSubtask from '../services/deleteSubtask';
import deleteTaskStatus from '../services/deleteTaskStatus';
import getSubtaskById from '../services/getSubtaskById';
import getTaskStatusById from '../services/getTaskStatusById';

function ListOfInputs({
  fields,
  append,
  remove,
  register,
  errors,
  setSubtasks = null,
  isSubtask = false,
  updating,
}) {
  const { selectedBoard, taskStatus, setTaskStatus } = useDatabaseContext();

  // Add news task status or subtasks
  const handleAddInput = () => {
    const generateInputId = crypto.randomUUID();

    if (isSubtask) {
      append({ idInput: generateInputId, name: `subtasks-${generateInputId}`, done: false });
    } else {
      append({ idInput: generateInputId, name: `taskStatus-${generateInputId}` });
    }
  };

  // Delete task status or subtasks
  const handleDelete = async ({ id, idInput }) => {
    // Delete task status of the selected board
    if (updating && !isSubtask) {
      // Check if the deleted status is in the database
      const data = await getTaskStatusById({ boardId: selectedBoard?.id, statusId: id });

      // If the deleted status is in the database then is also deleted from the database
      if (data) {
        await deleteTaskStatus({ statusId: id });

        // The taskStatus state is updated without the deleted status
        setTaskStatus(taskStatus.filter((status) => status.id !== id));
      }
    }

    if (updating && isSubtask) {
      // Check if the deleted subtask is in the database
      const data = await getSubtaskById({ idSubtask: id });

      // If the deleted subtask is in the database then is also deleted from the database
      if (data) {
        await deleteSubtask({ idSubtask: id });

        // The subtask state is updated without the deleted subtask
        setSubtasks((prevState) => prevState.filter((subtask) => subtask.id !== id));
      }
    }

    // Remove the subtask or the task status from the form
    remove(idInput);
  };

  return (
    <>
      <div htmlFor="taskName" className="flex flex-col gap-2">
        <p className="text-gray-500 dark:text-white text-sm font-semibold flex justify-between">
          {isSubtask ? 'Subtasks' : 'Board Columns'}

          {errors.taskStatus
          && <span className="text-red-600">This is not a correct task status name</span>}

          {errors.subtasks
          && <span className="text-red-600">This is not a correct subtask name</span>}
        </p>

        {fields.map((field, index) => (
          <label
            className="flex items-center gap-2"
            key={field.id}
            htmlFor={isSubtask ? `subtasks.${index}.value` : `taskStatus.${index}.value`}
          >
            <input
              type="text"
              placeholder={isSubtask ? 'e.g. Take coffe break' : 'e.g. Todo'}
              className={`${(errors?.taskStatus?.[index] || errors?.subtasks?.[index]) ? 'border-red-600' : 'border-gray-200 dark:border-gray-500'} dark:bg-slate-800 border-2 rounded-md py-2 px-2 text-black dark:text-white text-sm w-full appearance-none`}
              {...register(
                `${isSubtask ? `subtasks.${index}.value` : `taskStatus.${index}.value`}`,
                {
                  pattern: /^[a-zA-Z0-9\-\_\,\;\.\'ÑñáéíóúÁÉÍÓÚ\s]{3,}$/,
                  required: true,
                },
              )}
            />

            <button
              type="button"
              className="w-fit"
              onClick={() => handleDelete({ id: field.idInput, idInput: index })}
            >
              <img src="/assets/icon-cross.svg" alt="Delete input" />
            </button>
          </label>
        ))}
      </div>

      <button
        type="button"
        className="w-full rounded-full text-white bg-indigo-700 dark:text-indigo-700 dark:bg-white py-2 font-semibold lg:hover:bg-indigo-500 lg:hover:text-white transition-all duration-300 ease-in-out"
        onClick={handleAddInput}
      >
        {isSubtask ? '+ Add New Subtask' : '+ Add New Column'}
      </button>
    </>
  );
}

export default ListOfInputs;
