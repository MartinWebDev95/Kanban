import { useCallback, useEffect, useState } from 'react';
import addTask from '../services/addTask';
import useDatabaseContext from './useDatabaseContext';
import updateTask from '../services/updateTask';

function useTask({ openAddUpdateTaskModal, task, updating }) {
  const { selectedBoard, tasks, setTasks } = useDatabaseContext();
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

    if ((task.name !== formTask.taskName) || (task.description !== formTask.taskDescription)) {
      // Update task in the database
      await updateTask({ idTask: task.id, newTask: formTask });

      const newTaskState = tasks.map((item) => {
        if (item.id === task.id) {
          return {
            ...item,
            name: formTask.taskName,
            description: formTask.taskDescription,
          };
        }

        return item;
      });

      // Update the task name in the tasks state
      setTasks(newTaskState);
    }

    return null;
  }, [formTask]);

  return {
    addOrUpdateTasks, formTask, setFormTask,
  };
}

export default useTask;
