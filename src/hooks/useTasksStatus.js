import {
  useCallback, useEffect, useState,
} from 'react';
import useDatabaseContext from './useDatabaseContext';
import getDefaultInputs from '../helpers/getDefaultInputs';
import addTaskStatus from '../services/addTaskStatus';
import getInputsToUpdate from '../helpers/getInputsToUpdate';
import getTaskStatusById from '../services/getTaskStatusById';
import updateTaskStatusName from '../services/updateTaskStatusName';

function useTasksStatus({ openBoardModal, updating }) {
  const {
    selectedBoard, taskStatus, setTaskStatus,
  } = useDatabaseContext();
  const [inputs, setInputs] = useState([]);

  /* Create task status inputs with their values for each existing task status
  if it is in update mode */
  useEffect(() => {
    if (updating) {
      setInputs(getDefaultInputs({ inputs: taskStatus, isSubtask: false }));
    } else {
      setInputs(getDefaultInputs({ inputs: [], isSubtask: false }));
    }
  }, [openBoardModal, selectedBoard]);

  const addOrUpdateTasksStatus = useCallback(async ({ boardId }) => {
    if (!updating) {
      // Get the data from the tasks status inputs state
      const newTasksStatus = inputs.map(({ valueInput }) => (
        { name: valueInput, board_id: boardId }
      ));

      // Add the new tasks status that belong to the new board to the database
      await addTaskStatus({ taskStatus: newTasksStatus });
    } else {
      // Returns from the inputs state the status inputs where the name
      // has been changed and the new status inputs added to the state
      const inputsToUpdate = getInputsToUpdate({ initialState: taskStatus, inputs });

      inputsToUpdate.forEach(async ({ idInput, valueInput }) => {
        // Check if any of the inputs already exist in the database
        const data = await getTaskStatusById({
          boardId,
          statusId: idInput,
        });

        if (data) {
          // Update the task status name in the database
          await updateTaskStatusName({ newStatusName: valueInput, idStatus: idInput });

          // Update the task status name in the state
          setTaskStatus((prevState) => prevState.map((state) => {
            if (state.id === idInput) {
              return { ...state, name: valueInput };
            }

            return state;
          }));
        } else {
          // Add news task status in the database
          const newTaskStatusAdded = await addTaskStatus({
            taskStatus: { name: valueInput, board_id: boardId },
          });

          // Add news task status in the state
          setTaskStatus((prevState) => prevState.concat(newTaskStatusAdded));
        }
      });
    }
  }, [inputs]);

  return {
    addOrUpdateTasksStatus, inputs, setInputs,
  };
}

export default useTasksStatus;
