import { createContext, useMemo, useState } from 'react';

const dbContext = createContext();

function DatabaseProvider({ children }) {
  const [boards, setBoards] = useState([]);

  const value = useMemo(() => ({
    boards, setBoards,
  }), [boards]);

  return (
    <dbContext.Provider value={value}>
      {children}
    </dbContext.Provider>
  );
}

export { DatabaseProvider, dbContext };
