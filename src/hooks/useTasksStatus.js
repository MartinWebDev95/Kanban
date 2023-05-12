import { useCallback, useEffect, useState } from 'react';
import useDatabaseContext from './useDatabaseContext';
import getDefaultInputs from '../helpers/getDefaultInputs';
import addTaskStatus from '../services/addTaskStatus';

function useTasksStatus({ openBoardModal, updating }) {
  const { selectedBoard, taskStatus } = useDatabaseContext();
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
      const newTasksStatus = inputs.map((input) => (
        { name: input.valueInput, board_id: boardId }
      ));

      // Add the new tasks status that belong to the new board to the database
      await addTaskStatus({ taskStatus: newTasksStatus });
    }
  }, [inputs]);

  return {
    addOrUpdateTasksStatus, inputs, setInputs,
  };
}

export default useTasksStatus;
