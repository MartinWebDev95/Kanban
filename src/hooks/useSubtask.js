import { useCallback, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import getDefaultInputs from '../helpers/getDefaultInputs';
import addSubtasks from '../services/addSubtasks';
import getInputsToUpdate from '../helpers/getInputsToUpdate';
import getSubtaskById from '../services/getSubtaskById';
import updateSubtask from '../services/updateSubtask';
import getFormattedInputs from '../helpers/getFormattedInputs';

function useSubtask({
  openAddUpdateTaskModal, updating, subtasks, setSubtasks, control,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });

  /* Add subtasks inputs with their values for each existing subtasks
  if it is in update mode */
  useEffect(() => {
    if (!updating && openAddUpdateTaskModal) {
      append(getDefaultInputs({ inputs: [], isSubtask: true }), { shouldFocus: false });
    } else if (updating && openAddUpdateTaskModal) {
      append(getDefaultInputs({ inputs: subtasks, isSubtask: true }), { shouldFocus: false });
    }
  }, [openAddUpdateTaskModal]);

  const addOrUpdateSubtasks = useCallback(async ({ newSubtasksInputs, taskId }) => {
    if (!updating) {
      // I am left with only the properties that I need to save in the database
      const subtasksToAdd = getFormattedInputs({
        newInputs: newSubtasksInputs,
        isSubtask: true,
        id: taskId,
      });

      // Add the new subtasks that belong to the new task to the database
      await addSubtasks({ subtasks: subtasksToAdd });
    } else {
      /* Returns from the subtasks of the form the subtasks inputs where the name
      has been changed and the new subtasks added to the form */
      const inputsToUpdate = getInputsToUpdate({
        initialState: subtasks,
        inputs: newSubtasksInputs,
      });

      inputsToUpdate.forEach(async ({ idInput, done, value }) => {
        // Check if any of the subtasks already exist in the database
        const data = await getSubtaskById({
          idSubtask: idInput,
        });

        if (data) {
          // Update subtask name in the database
          await updateSubtask({ newSubtaskName: value, idSubtask: idInput });

          // Update the subtask name in the state
          setSubtasks((prevState) => prevState.map((state) => {
            if (state.id === idInput) {
              return { ...state, name: value };
            }

            return state;
          }));
        } else {
          // Add news subtasks in the database
          const newSubtaskAdded = await addSubtasks({
            subtasks: { name: value, done, task_id: taskId },
          });

          // Add news subtasks in the state
          setSubtasks((prevState) => prevState.concat(newSubtaskAdded));
        }
      });
    }
  }, []);

  return {
    addOrUpdateSubtasks, fields, append, remove,
  };
}

export default useSubtask;
