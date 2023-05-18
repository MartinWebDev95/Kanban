import { useCallback, useEffect, useState } from 'react';
import getDefaultInputs from '../helpers/getDefaultInputs';
import addSubtasks from '../services/addSubtasks';

function useSubtask({
  openAddUpdateTaskModal, updating, subtasks,
}) {
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (updating) {
      setInputs(getDefaultInputs({ inputs: subtasks, isSubtask: true }));
    } else {
      setInputs(getDefaultInputs({ inputs: [], isSubtask: true }));
    }
  }, [openAddUpdateTaskModal]);

  const addOrUpdateSubtasks = useCallback(async ({ taskId }) => {
    if (!updating) {
      const newSubtasks = inputs.map(({ valueInput, doneInput }) => (
        { name: valueInput, done: doneInput, task_id: taskId }
      ));

      // Add the new subtasks that belong to the new task to the database
      await addSubtasks({ subtasks: newSubtasks });
    }
  }, [inputs]);

  return { inputs, setInputs, addOrUpdateSubtasks };
}

export default useSubtask;
