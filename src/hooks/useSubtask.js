import { useEffect, useState } from 'react';
import getSubtasks from '../services/getSubtasks';

function useSubtask({ task }) {
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    getSubtasks({ taskId: task.id })
      .then((subtask) => {
        setSubtasks(subtask);
      });
  }, []);

  return { subtasks, setSubtasks };
}

export default useSubtask;
