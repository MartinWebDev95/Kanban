import { useContext } from 'react';
import { dbContext } from '../context/DatabaseContext';

function useDatabaseContext() {
  const context = useContext(dbContext);

  return context;
}

export default useDatabaseContext;
