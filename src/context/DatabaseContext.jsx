import { createContext, useMemo, useState } from 'react';

const dbContext = createContext();

function DatabaseProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({});

  const value = useMemo(() => ({
    boards, setBoards, selectedBoard, setSelectedBoard,
  }), [boards, selectedBoard]);

  return (
    <dbContext.Provider value={value}>
      {children}
    </dbContext.Provider>
  );
}

export { DatabaseProvider, dbContext };
