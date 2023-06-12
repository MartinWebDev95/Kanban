import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import addTask from '../services/addTask';
import useDatabaseContext from './useDatabaseContext';
import updateTask from '../services/updateTask';
import deleteTask from '../services/deleteTask';

function useTask({
  openAddUpdateTaskModal, task, updating,
} = {}) {
  const {
    selectedBoard, tasks, setTasks, taskStatus,
  } = useDatabaseContext();

  const {
    register, handleSubmit, formState: { errors }, reset, control, setValue, setFocus,
  } = useForm({
    defaultValues: {
      taskName: '',
      taskDescription: '',
      taskStatus: 0,
    },
  });

  // If it is in update mode, the form fields are filled with the values of the selected task
  useEffect(() => {
    if (updating && openAddUpdateTaskModal) {
      setValue('taskName', task.name);
      setValue('taskDescription', task.description);
      setValue('taskStatus', task.status_id);
    } else {
      setValue('taskStatus', taskStatus?.[0]?.id);
    }

    setFocus('taskName');
  }, [openAddUpdateTaskModal]);

  const addOrUpdateTasks = useCallback(async ({ newTaskInfo }) => {
    if (!updating) {
      // Add new task in the database
      const newTaskAdded = await addTask({ boardId: selectedBoard.id, taskInfo: newTaskInfo });

      // Add the new task in tasks state
      setTasks((prevTasks) => prevTasks.concat(newTaskAdded[0]));

      // Return the new task added id
      return newTaskAdded[0].id;
    }

    if ((task.name !== newTaskInfo.taskName)
    || (task.description !== newTaskInfo.taskDescription)) {
      // Update task in the database
      await updateTask({ idTask: task.id, newTask: newTaskInfo });

      const newTaskState = tasks.map((item) => {
        if (item.id === task.id) {
          return {
            ...item,
            name: newTaskInfo.taskName,
            description: newTaskInfo.taskDescription,
          };
        }

        return item;
      });

      // Update the task name and the task description in the tasks state
      setTasks(newTaskState);
    }

    return null;
  }, [task]);

  const handleDeleteTask = async () => {
    // Delete task in database
    await deleteTask({ idTask: task.id });

    // Update the task state without the task just deleted
    setTasks(tasks.filter((item) => item.id !== task.id));
  };

  return {
    addOrUpdateTasks, register, control, errors, reset, handleSubmit, handleDeleteTask,
  };
}

export default useTask;
