import { useCallback, useEffect, useState } from 'react';
import getDefaultInputs from '../helpers/getDefaultInputs';
import addSubtasks from '../services/addSubtasks';
import getInputsToUpdate from '../helpers/getInputsToUpdate';
import getSubtaskById from '../services/getSubtaskById';
import updateSubtask from '../services/updateSubtask';

function useSubtask({
  openAddUpdateTaskModal, updating, subtasks, setSubtasks,
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
    } else {
      // Returns from the inputs state the subtasks inputs where the name
      // has been changed and the new subtasks inputs added to the state
      const inputsToUpdate = getInputsToUpdate({ initialState: subtasks, inputs });

      inputsToUpdate.forEach(async ({ idInput, doneInput, valueInput }) => {
        // Check if any of the inputs already exist in the database
        const data = await getSubtaskById({
          idSubtask: idInput,
        });

        if (data) {
          // Update subtask name in the database
          await updateSubtask({ newSubtaskName: valueInput, idSubtask: idInput });

          // Update the subtask name in the state
          setSubtasks((prevState) => prevState.map((state) => {
            if (state.id === idInput) {
              return { ...state, name: valueInput };
            }

            return state;
          }));
        } else {
          // Add news subtasks in the database
          const newSubtaskAdded = await addSubtasks({
            subtasks: { name: valueInput, done: doneInput, task_id: taskId },
          });

          // Add news subtasks in the state
          setSubtasks((prevState) => prevState.concat(newSubtaskAdded));
        }
      });
    }
  }, [inputs]);

  return { inputs, setInputs, addOrUpdateSubtasks };
}

export default useSubtask;
