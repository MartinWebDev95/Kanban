import { useCallback, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import useDatabaseContext from './useDatabaseContext';
import getDefaultInputs from '../helpers/getDefaultInputs';
import addTaskStatus from '../services/addTaskStatus';
import getInputsToUpdate from '../helpers/getInputsToUpdate';
import getTaskStatusById from '../services/getTaskStatusById';
import updateTaskStatusName from '../services/updateTaskStatusName';
import getFormattedInputs from '../helpers/getFormattedInputs';

function useTasksStatus({ openBoardModal, updating, control } = {}) {
  const {
    selectedBoard, taskStatus, setTaskStatus,
  } = useDatabaseContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'taskStatus',
  });

  /* Add task status inputs with their values for each existing task status
  if it is in update mode */
  useEffect(() => {
    if (!updating && openBoardModal) {
      append(getDefaultInputs({ inputs: [], isSubtask: false }), { shouldFocus: false });
    } else if (updating && openBoardModal) {
      append(getDefaultInputs({ inputs: taskStatus, isSubtask: false }), { shouldFocus: false });
    }
  }, [openBoardModal]);

  const addOrUpdateTasksStatus = useCallback(async ({ newTasksStatus, boardId }) => {
    if (!updating) {
      // I am left with only the properties that I need to save in the database
      const taskStatusToAdd = getFormattedInputs({
        newInputs: newTasksStatus,
        isSubtask: false,
        id: boardId,
      });

      // Add the new tasks status that belong to the new board to the database
      await addTaskStatus({ taskStatus: taskStatusToAdd });

      // Update the taskStatus update
      setTaskStatus(newTasksStatus);
    } else {
      /* Returns from the task status of the form the task status inputs where the name
      has been changed and the new task status added to the form */
      const inputsToUpdate = getInputsToUpdate({
        initialState: taskStatus,
        inputs: newTasksStatus,
      });

      inputsToUpdate.forEach(async ({ idInput, value }) => {
        // Check if any of the task status already exist in the database
        const data = await getTaskStatusById({
          boardId,
          statusId: idInput,
        });

        if (data) {
          // Update the task status name in the database
          await updateTaskStatusName({ newStatusName: value, idStatus: idInput });

          // Update the task status name in the state
          setTaskStatus((prevState) => prevState.map((state) => {
            if (state.id === idInput) {
              return { ...state, name: value };
            }

            return state;
          }));
        } else {
          // Add news task status in the database
          const newTaskStatusAdded = await addTaskStatus({
            taskStatus: {
              name: value,
              board_id: boardId,
            },
          });

          // Add news task status in the state
          setTaskStatus((prevState) => prevState.concat(newTaskStatusAdded));
        }
      });
    }

    return null;
  }, [selectedBoard]);

  return {
    addOrUpdateTasksStatus,
    fields,
    append,
    remove,
  };
}

export default useTasksStatus;
