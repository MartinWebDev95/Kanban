import { useCallback, useEffect, useState } from 'react';
import addTask from '../services/addTask';
import useDatabaseContext from './useDatabaseContext';

function useTask({ openAddUpdateTaskModal, task, updating }) {
  const { selectedBoard, setTasks } = useDatabaseContext();
  const [formTask, setFormTask] = useState({
    taskName: '',
    taskDescription: '',
    taskStatus: 1,
  });

  useEffect(() => {
    if (updating) {
      setFormTask({
        taskName: task.name,
        taskDescription: task.description,
        taskStatus: task.status_id,
      });
    }
  }, [openAddUpdateTaskModal]);

  const addOrUpdateTasks = useCallback(async () => {
    if (!updating) {
      // Add new task in the database
      const newTaskAdded = await addTask({ boardId: selectedBoard.id, taskInfo: formTask });

      // Add the new task in tasks state
      setTasks((prevTasks) => prevTasks.concat(newTaskAdded[0]));

      // Return the new task added id
      return newTaskAdded[0].id;
    }

    return null;
  }, [formTask]);

  return { addOrUpdateTasks, formTask, setFormTask };
}

export default useTask;
