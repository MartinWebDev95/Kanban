/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import ListOfInputs from './ListOfInputs';
import CurrentStatus from './CurrentStatus';
import useTask from '../hooks/useTask';
import useSubtask from '../hooks/useSubtask';

function AddUpdateTaskModal({
  openAddUpdateTaskModal,
  setOpenAddUpdateTaskModal,
  task = {},
  subtasks = [],
  setSubtasks = null,
  updating = false,
}) {
  const {
    addOrUpdateTasks, handleSubmit, register, reset, control, errors,
  } = useTask({
    openAddUpdateTaskModal,
    task,
    updating,
  });

  const {
    addOrUpdateSubtasks, fields, append, remove,
  } = useSubtask({
    openAddUpdateTaskModal,
    updating,
    subtasks,
    setSubtasks,
    control,
  });

  const handleCloseNewTaskModal = (e) => {
    if (e.target.ariaLabel === 'newTask-modal') {
      // Close the modal
      setOpenAddUpdateTaskModal(false);

      // Reset the form task values
      reset();

      // Delete all subtasks
      remove();
    }
  };

  const onSubmit = async (data) => {
    const {
      taskName, taskDescription, taskStatus, subtasks,
    } = data;

    const newTaskId = await addOrUpdateTasks(
      {
        newTaskInfo: {
          taskName,
          taskDescription,
          taskStatus: Number(taskStatus),
        },
      },
    );

    await addOrUpdateSubtasks({
      newSubtasksInputs: subtasks,
      taskId: !updating ? newTaskId : task.id,
    });

    setOpenAddUpdateTaskModal(false);

    reset();

    remove();
  };

  return (
    openAddUpdateTaskModal && (
      <div
        className="grid place-items-center bg-black/50 absolute z-30 top-0 left-0 bottom-0 w-full h-screen py-16"
        aria-label="newTask-modal"
        onClick={handleCloseNewTaskModal}
      >
        <form
          action=""
          className="bg-white dark:bg-slate-800 rounded-md w-11/12 md:w-4/5 lg:w-2/5 h-full p-7 flex flex-col gap-6 overflow-y-scroll scrollbar-hide"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-black dark:text-white font-semibold text-lg">
            {updating ? 'Edit Task' : 'Add New Task'}
          </h2>

          <label htmlFor="taskName" className="flex flex-col gap-2">
            <p className="text-gray-500 dark:text-white text-sm font-semibold text-left flex justify-between">
              <span>
                Task Name
              </span>
              {errors.taskName
              && (<span className="text-red-600">This is not a correct task name</span>)}
            </p>

            <input
              type="text"
              name="taskName"
              id="taskName"
              placeholder="e.g. Take coffe break"
              className={`${errors.taskName ? 'border-red-600' : 'border-gray-200 dark:border-gray-500'} dark:bg-slate-800 border-2 rounded-md py-2 px-2 text-black dark:text-white text-sm placeholder:text-sm`}
              {...register(
                'taskName',
                {
                  pattern: /^[a-zA-Z0-9\-\_\,\;\.\'ÑñáéíóúÁÉÍÓÚ\s]{3,}$/,
                  required: true,
                },
              )}
            />
          </label>

          <label htmlFor="description" className="flex flex-col gap-2">
            <p className="text-gray-500 dark:text-white text-sm font-semibold text-left flex justify-between">
              <span>
                Description
              </span>
              {errors.taskDescription
              && (<span className="text-red-600">This is not a correct task description</span>)}
            </p>

            <textarea
              name="taskDescription"
              id="taskDescription"
              cols="30"
              rows="5"
              placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
              className={`${errors.taskDescription ? 'border-red-600' : 'border-gray-200 dark:border-gray-500'} dark:bg-slate-800 border-2 rounded-md py-2 px-2 text-black dark:text-white text-sm placeholder:text-sm`}
              {...register(
                'taskDescription',
                { pattern: /^[a-zA-Z0-9\-\_\,\;\.\'ÑñáéíóúÁÉÍÓÚ\s]{3,}$/ },
              )}
            />
          </label>

          <ListOfInputs
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
            setSubtasks={setSubtasks}
            isSubtask
            updating={updating}
          />

          <CurrentStatus
            task={task}
            register={register}
            updating={updating}
          />

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
