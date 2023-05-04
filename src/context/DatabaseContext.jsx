import { createContext, useMemo, useState } from 'react';

const dbContext = createContext();

function DatabaseProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({});
  const [taskStatus, setTaskStatus] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const value = useMemo(() => ({
    boards,
    setBoards,
    selectedBoard,
    setSelectedBoard,
    taskStatus,
    setTaskStatus,
    tasks,
    setTasks,
    loading,
    setLoading,
  }), [boards, selectedBoard, taskStatus, tasks, loading]);

  return (
    <dbContext.Provider value={value}>
      {children}
    </dbContext.Provider>
  );
}

export { DatabaseProvider, dbContext };
