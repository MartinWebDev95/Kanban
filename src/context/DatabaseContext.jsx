import { createContext, useMemo, useState } from 'react';

const dbContext = createContext();

function DatabaseProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({});
  const [taskStatus, setTaskStatus] = useState([]);

  const value = useMemo(() => ({
    boards, setBoards, selectedBoard, setSelectedBoard, taskStatus, setTaskStatus,
  }), [boards, selectedBoard, taskStatus]);

  return (
    <dbContext.Provider value={value}>
      {children}
    </dbContext.Provider>
  );
}

export { DatabaseProvider, dbContext };
